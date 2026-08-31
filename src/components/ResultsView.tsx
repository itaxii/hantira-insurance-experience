import { motion } from "framer-motion";
import type { InteractionDefinition, VoteRecord } from "../types";
import { aggregateVotes } from "../lib/votes";

export function ResultsView({
  interaction,
  votes,
  namesVisible
}: {
  interaction: InteractionDefinition;
  votes: VoteRecord[];
  namesVisible: "hidden" | "sample" | "all";
}) {
  const aggregates = aggregateVotes(votes, interaction.options.map((option) => option.id));
  const totalParticipants = new Set(votes.map((vote) => vote.participant_session_id)).size;

  return (
    <div className="results-view">
      {aggregates.map((aggregate) => {
        const option = interaction.options.find((item) => item.id === aggregate.optionId);
        const width = interaction.type === "multi" && totalParticipants
          ? Math.round((aggregate.count / totalParticipants) * 100)
          : aggregate.percent;
        const visibleNames =
          namesVisible === "hidden"
            ? []
            : namesVisible === "all" && aggregate.names.length <= 30
              ? aggregate.names
              : aggregate.names.slice(0, 5);
        return (
          <div className="result-row" key={aggregate.optionId}>
            <div className="result-meta">
              <span>{option?.label}</span>
              <strong>{width}% · {aggregate.count}</strong>
            </div>
            <div className="bar-track">
              <motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${width}%` }} />
            </div>
            {visibleNames.length > 0 && (
              <div className="name-sample">
                {visibleNames.join(" • ")}
                {aggregate.names.length > visibleNames.length ? ` • +${aggregate.names.length - visibleNames.length}` : ""}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
