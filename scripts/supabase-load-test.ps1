param(
  [string]$RoomCode = "5806",
  [int]$Users = 250,
  [int]$Concurrency = 25,
  [switch]$WriteJoinRows
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

function Get-ConfigValue([string]$Name) {
  $value = [Environment]::GetEnvironmentVariable($Name)
  if ($value) { return $value }

  $gh = Get-Command gh -ErrorAction SilentlyContinue
  if ($gh) {
    $vars = gh variable list | ConvertFrom-Csv -Delimiter "`t" -Header Name,Value,UpdatedAt
    $match = $vars | Where-Object Name -eq $Name | Select-Object -First 1
    if ($match) { return $match.Value }
  }

  throw "Missing $Name. Set it in the environment or GitHub repository variables."
}

function New-HttpClient() {
  $client = [System.Net.Http.HttpClient]::new()
  $client.Timeout = [TimeSpan]::FromSeconds(30)
  return $client
}

function New-Request([string]$Method, [string]$Uri, [string]$Token, [string]$Body = $null) {
  $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::new($Method), $Uri)
  $request.Headers.TryAddWithoutValidation("apikey", $script:AnonKey) | Out-Null
  $request.Headers.TryAddWithoutValidation("Authorization", "Bearer $Token") | Out-Null
  if ($Body) {
    $request.Content = [System.Net.Http.StringContent]::new($Body, [System.Text.Encoding]::UTF8, "application/json")
    $request.Headers.TryAddWithoutValidation("Prefer", "return=representation") | Out-Null
  }
  return $request
}

function Invoke-Json([System.Net.Http.HttpClient]$Client, [System.Net.Http.HttpRequestMessage]$Request) {
  $response = $Client.SendAsync($Request).GetAwaiter().GetResult()
  $content = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
  if (-not $response.IsSuccessStatusCode) {
    throw "HTTP $([int]$response.StatusCode): $content"
  }
  if ([string]::IsNullOrWhiteSpace($content)) { return $null }
  return $content | ConvertFrom-Json
}

function Invoke-TimedRequest([System.Net.Http.HttpClient]$Client, [System.Net.Http.HttpRequestMessage]$Request) {
  $watch = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $response = $Client.SendAsync($Request).GetAwaiter().GetResult()
    $content = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
    $watch.Stop()
    return [pscustomobject]@{
      ok = $response.IsSuccessStatusCode
      status = [int]$response.StatusCode
      ms = $watch.Elapsed.TotalMilliseconds
      error = if ($response.IsSuccessStatusCode) { $null } else { $content.Substring(0, [Math]::Min(180, $content.Length)) }
    }
  } catch {
    $watch.Stop()
    return [pscustomobject]@{
      ok = $false
      status = 0
      ms = $watch.Elapsed.TotalMilliseconds
      error = $_.Exception.Message
    }
  }
}

function Get-Percentile([double[]]$Values, [double]$Percentile) {
  if ($Values.Count -eq 0) { return 0 }
  $sorted = $Values | Sort-Object
  $index = [Math]::Ceiling(($Percentile / 100) * $sorted.Count) - 1
  return [Math]::Round($sorted[[Math]::Max(0, [Math]::Min($index, $sorted.Count - 1))], 1)
}

$script:SupabaseUrl = (Get-ConfigValue "VITE_SUPABASE_URL").TrimEnd("/")
$script:AnonKey = Get-ConfigValue "VITE_SUPABASE_ANON_KEY"

$client = New-HttpClient
$roomQuery = "$script:SupabaseUrl/rest/v1/rooms?select=id,code,status,joins_allowed,voting_open,active_interaction&code=eq.$RoomCode&limit=1"
$room = @(Invoke-Json $client (New-Request "GET" $roomQuery $script:AnonKey)) | Select-Object -First 1
if (-not $room) { throw "Room $RoomCode was not found." }
$script:RoomId = $room.id

Write-Host "Supabase URL: $script:SupabaseUrl"
Write-Host "Room: $($room.code) / $($room.status) / joins_allowed=$($room.joins_allowed) / voting_open=$($room.voting_open)"
Write-Host "Mode: $($(if ($WriteJoinRows) { 'write join rows' } else { 'read-only audience initial-load spike' }))"
Write-Host "Users: $Users  Concurrency: $Concurrency"

$watch = [System.Diagnostics.Stopwatch]::StartNew()
$results = 0..($Users - 1) | ForEach-Object -Parallel {
  Add-Type -AssemblyName System.Net.Http
  $SupabaseUrl = $using:script:SupabaseUrl
  $AnonKey = $using:script:AnonKey
  $RoomId = $using:script:RoomId
  $client = [System.Net.Http.HttpClient]::new()
  $client.Timeout = [TimeSpan]::FromSeconds(30)
  $uris = @(
    "$SupabaseUrl/rest/v1/rooms?select=*&id=eq.$RoomId&limit=1",
    "$SupabaseUrl/rest/v1/participants?select=*&room_id=eq.$RoomId&order=joined_at.asc",
    "$SupabaseUrl/rest/v1/votes?select=*,participants(display_name)&room_id=eq.$RoomId&order=created_at.asc"
  )
  foreach ($uri in $uris) {
    $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Get, $uri)
    $request.Headers.TryAddWithoutValidation("apikey", $AnonKey) | Out-Null
    $request.Headers.TryAddWithoutValidation("Authorization", "Bearer $AnonKey") | Out-Null
    $watch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
      $response = $client.SendAsync($request).GetAwaiter().GetResult()
      $content = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
      $watch.Stop()
      [pscustomobject]@{ ok = $response.IsSuccessStatusCode; status = [int]$response.StatusCode; ms = $watch.Elapsed.TotalMilliseconds; endpoint = $uri.Split("?")[0].Split("/")[-1]; error = if ($response.IsSuccessStatusCode) { $null } else { $content.Substring(0, [Math]::Min(120, $content.Length)) } }
    } catch {
      $watch.Stop()
      [pscustomobject]@{ ok = $false; status = 0; ms = $watch.Elapsed.TotalMilliseconds; endpoint = "network"; error = $_.Exception.Message }
    }
  }
} -ThrottleLimit $Concurrency
$watch.Stop()

$latencies = @($results | ForEach-Object { [double]$_.ms })
$errors = @($results | Where-Object { -not $_.ok })

$summary = [pscustomobject]@{
  mode = "read"
  roomCode = $room.code
  virtualUsers = $Users
  totalRequests = $results.Count
  concurrency = $Concurrency
  elapsedSeconds = [Math]::Round($watch.Elapsed.TotalSeconds, 2)
  requestsPerSecond = [Math]::Round($results.Count / [Math]::Max(0.001, $watch.Elapsed.TotalSeconds), 1)
  successRate = [Math]::Round((($results.Count - $errors.Count) / [Math]::Max(1, $results.Count)) * 100, 2)
  p50Ms = Get-Percentile $latencies 50
  p95Ms = Get-Percentile $latencies 95
  p99Ms = Get-Percentile $latencies 99
  maxMs = [Math]::Round(($latencies | Measure-Object -Maximum).Maximum, 1)
  errorsByStatus = $errors | Group-Object status | ForEach-Object { [pscustomobject]@{ status = $_.Name; count = $_.Count } }
}

$summary | ConvertTo-Json -Depth 6

if ($WriteJoinRows) {
  Write-Warning "Write mode creates persistent anonymous auth users and participant rows under current RLS. Keep this capped, or clean up later with direct database/admin access."
}
