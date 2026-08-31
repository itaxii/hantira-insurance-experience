import { useCallback, useEffect, useMemo, useState } from "react";
import { appConfig } from "../config";
import type { Participant, RoomState, VoteRecord } from "../types";
import { makeRoom } from "./roomState";
import { hasSupabaseConfig, supabase } from "./supabaseClient";
import { useLocalRoom } from "./localStore";
import { ensureAnonymousAuth } from "./supabaseAuth";
import { isPresenterSessionAllowed } from "./presenterAuth";

export function useExperienceStore(roomCode = appConfig.room.defaultCode) {
  const local = useLocalRoom();
  const [room, setRoom] = useState<RoomState | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [loading, setLoading] = useState(hasSupabaseConfig);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const roomResult = await supabase.from("rooms").select("*").eq("code", roomCode).maybeSingle();
    if (roomResult.error) {
      setError(roomResult.error.message);
      setLoading(false);
      return;
    }
    if (!roomResult.data) {
      setRoom(null);
      setLoading(false);
      return;
    }
    setRoom(roomResult.data as RoomState);
    const [participantResult, voteResult] = await Promise.all([
      supabase.from("participants").select("*").eq("room_id", roomResult.data.id).order("joined_at", { ascending: true }),
      supabase
        .from("votes")
        .select("*, participants(display_name)")
        .eq("room_id", roomResult.data.id)
        .order("created_at", { ascending: true })
    ]);
    if (participantResult.data) setParticipants(participantResult.data as Participant[]);
    if (voteResult.data) setVotes(voteResult.data as VoteRecord[]);
    setLoading(false);
  }, [roomCode]);

  useEffect(() => {
    if (!supabase) return;
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!supabase || !room?.id) return;
    const client = supabase;
    const channel = client
      .channel(`hantira-room-${room.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "rooms", filter: `id=eq.${room.id}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "participants", filter: `room_id=eq.${room.id}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "votes", filter: `room_id=eq.${room.id}` }, refresh)
      .on("presence", { event: "sync" }, refresh)
      .subscribe();
    return () => {
      client.removeChannel(channel);
    };
  }, [room?.id, refresh]);

  const createRoom = useCallback(async (code: string) => {
    if (!supabase) return local.updateRoom(makeRoom(code));
    const client = supabase;
    const user = await client.auth.getUser();
    if (!isPresenterSessionAllowed(user.data.user)) {
      setError("presenter_auth_required");
      return;
    }
    const next = makeRoom(code);
    const result = await client
      .from("rooms")
      .insert({ ...next, presenter_user_id: user.data.user?.id ?? null })
      .select("*")
      .single();
    if (result.error) setError(result.error.message);
    if (result.data) setRoom(result.data as RoomState);
  }, [local]);

  const api = useMemo(() => {
    if (!supabase) return { ...local, loading: false, error: null, createRoom };
    const client = supabase;
    return {
      room: room ?? makeRoom(roomCode),
      participants,
      votes,
      loading,
      error,
      createRoom,
      async updateRoom(patch: Partial<RoomState>) {
        if (!room) return;
        const result = await client.from("rooms").update(patch).eq("id", room.id).select("*").single();
        if (result.error) setError(result.error.message);
        if (result.data) setRoom(result.data as RoomState);
      },
      async join(displayName: string, sessionId: string) {
        if (!room) return;
        const authUserId = await ensureAnonymousAuth(client);
        const now = new Date().toISOString();
        const result = await client.from("participants").upsert(
          {
            room_id: room.id,
            session_id: sessionId,
            auth_user_id: authUserId,
            display_name: displayName,
            last_seen_at: now
          },
          { onConflict: "room_id,session_id" }
        );
        if (result.error) setError(result.error.message);
        await refresh();
      },
      async submitVote(questionId: string, sessionId: string, optionIds: string[], allowChange: boolean) {
        if (!room?.voting_open) return false;
        await ensureAnonymousAuth(client);
        const existing = votes.filter((vote) => vote.question_id === questionId && vote.participant_session_id === sessionId);
        if (existing.length && !allowChange) return false;
        if (allowChange && existing.length) {
          await client.from("votes").delete().eq("room_id", room.id).eq("question_id", questionId).eq("participant_session_id", sessionId);
        }
        const result = await client.from("votes").insert(
          optionIds.map((optionId) => ({
            room_id: room.id,
            question_id: questionId,
            participant_session_id: sessionId,
            option_id: optionId
          }))
        );
        if (result.error) {
          setError(result.error.message);
          return false;
        }
        await refresh();
        return true;
      },
      async resetVotes(questionId?: string) {
        if (!room) return;
        let query = client.from("votes").delete().eq("room_id", room.id);
        if (questionId) query = query.eq("question_id", questionId);
        const result = await query;
        if (result.error) setError(result.error.message);
        await refresh();
      }
    };
  }, [local, room, participants, votes, loading, error, createRoom, roomCode, refresh]);

  return api;
}
