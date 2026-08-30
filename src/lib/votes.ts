import type { InteractionDefinition, VoteRecord } from "../types";

export type VoteAggregate = {
  optionId: string;
  count: number;
  percent: number;
  names: string[];
};

export function canSubmitVote({
  alreadyVoted,
  allowChange,
  votingOpen
}: {
  alreadyVoted: boolean;
  allowChange: boolean;
  votingOpen: boolean;
}) {
  if (!votingOpen) return false;
  if (alreadyVoted && !allowChange) return false;
  return true;
}

export function aggregateVotes(votes: Array<VoteRecord & { displayName?: string }>, optionIds: string[]): VoteAggregate[] {
  const total = votes.length;
  return optionIds.map((optionId) => {
    const matching = votes.filter((vote) => vote.option_id === optionId || (vote as { optionId?: string }).optionId === optionId);
    return {
      optionId,
      count: matching.length,
      percent: total === 0 ? 0 : Math.round((matching.length / total) * 100),
      names: matching.map((vote) => vote.participants?.display_name ?? (vote as { displayName?: string }).displayName ?? "").filter(Boolean)
    };
  });
}

export function isCorrectSelection(interaction: InteractionDefinition, selected: string[]) {
  if (!interaction.correctAnswer) return null;
  const correct = Array.isArray(interaction.correctAnswer) ? interaction.correctAnswer : [interaction.correctAnswer];
  if (interaction.type === "multi") {
    return selected.length === correct.length && selected.every((id) => correct.includes(id));
  }
  return selected.length === 1 && correct.includes(selected[0]);
}

export function personalResultText(interaction: InteractionDefinition, nickname: string, selectedLabels: string[]) {
  const correctness = isCorrectSelection(
    interaction,
    selectedLabels.map((label) => interaction.options.find((option) => option.label === label)?.id ?? label)
  );
  if (correctness === null) return `اختيارك اتسجل وشوفنا رأي المجموعة.`;
  if (correctness) return `عاش يا ${nickname}، اختيارك كان صح.`;
  const best = interaction.options
    .filter((option) =>
      Array.isArray(interaction.correctAnswer)
        ? interaction.correctAnswer.includes(option.id)
        : option.id === interaction.correctAnswer
    )
    .map((option) => option.label)
    .join("، ");
  return `المرة دي حنتيرة ضحك عليك 😄\nاختيارك كان: ${selectedLabels.join("، ")}\nالإجابة الأفضل: ${best}`;
}
