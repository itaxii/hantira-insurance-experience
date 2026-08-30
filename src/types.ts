export type CharacterExpression =
  | "neutral"
  | "happy"
  | "confused"
  | "shocked"
  | "worried"
  | "proud"
  | "suspicious"
  | "thinking"
  | "angry"
  | "relieved";

export type CharacterAnimation =
  | "idle"
  | "walk"
  | "run"
  | "wave"
  | "point"
  | "think"
  | "panic"
  | "fall"
  | "celebrate"
  | "look-left"
  | "look-right"
  | "facepalm";

export type Beat = {
  id: string;
  headline?: string;
  kicker?: string;
  body?: string;
  dialogue?: string;
  visual?: string;
  hantira?: { expression?: CharacterExpression; animation?: CharacterAnimation; facing?: "left" | "right" };
  faheem?: { expression?: CharacterExpression; animation?: CharacterAnimation; facing?: "left" | "right" };
  effects?: string[];
};

export type InteractionType = "single" | "multi";

export type InteractionOption = {
  id: string;
  label: string;
  detail?: string;
  mapsTo?: string;
};

export type InteractionDefinition = {
  id: string;
  sceneId: string;
  type: InteractionType;
  question: string;
  options: InteractionOption[];
  correctAnswer?: string | string[];
  allowChange: boolean;
  explanation?: string;
  nameVisualization?: boolean;
};

export type Scene = {
  id: string;
  title: string;
  kind?: "story" | "join" | "interaction" | "ending";
  onceOnlyQr?: boolean;
  beats: Beat[];
  interaction?: InteractionDefinition;
};

export type StoryPosition = {
  sceneIndex: number;
  beatIndex: number;
};

export type RoomStatus = "draft" | "join" | "live" | "ended";

export type RoomState = {
  id: string;
  code: string;
  status: RoomStatus;
  current_scene: number;
  current_beat: number;
  voting_open: boolean;
  answer_revealed: boolean;
  results_visible: boolean;
  names_visible: "hidden" | "sample" | "all";
  active_interaction: string | null;
  joins_allowed: boolean;
  muted: boolean;
  updated_at: string;
};

export type Participant = {
  id: string;
  room_id: string;
  session_id: string;
  display_name: string;
  joined_at: string;
  last_seen_at: string;
};

export type VoteRecord = {
  id?: string;
  room_id: string;
  question_id: string;
  participant_session_id: string;
  option_id: string;
  created_at?: string;
  participants?: Pick<Participant, "display_name"> | null;
};
