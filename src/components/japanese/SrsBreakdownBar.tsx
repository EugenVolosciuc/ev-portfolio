import { useState } from "react";
import { motion } from "framer-motion";
import type { SrsBreakdown } from "types/japanese";

type Props = {
  breakdown: SrsBreakdown;
  label?: string;
};

const stages = [
  { key: "apprentice" as const, label: "Apprentice", color: "#DD0093" },
  { key: "guru" as const, label: "Guru", color: "#882D9E" },
  { key: "master" as const, label: "Master", color: "#294DDB" },
  { key: "enlightened" as const, label: "Enlightened", color: "#0093DD" },
  { key: "burned" as const, label: "Burned", color: "#434343" },
];

const SrsBreakdownBar = ({ breakdown, label }: Props) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const total = Object.values(breakdown).reduce((sum, n) => sum + n, 0);

  if (total === 0) return null;

  return (
    <div className="w-full">
      {label && (
        <p className="text-sm text-gray-500 mb-2 font-RobotoMono">{label}</p>
      )}
      <div className="flex w-full h-6 rounded-full overflow-hidden bg-gray-100 relative">
        {stages.map(({ key, label: stageLabel, color }, i) => {
          const count = breakdown[key];
          const percentage = (count / total) * 100;
          if (percentage === 0) return null;

          return (
            <motion.div
              key={key + stageLabel}
              className="h-full relative cursor-pointer"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredStage(key)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {hoveredStage === key && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {stageLabel}: {count}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {stages.map(({ key, label: stageLabel, color }) => {
          const count = breakdown[key];
          if (count === 0) return null;
          return (
            <div
              key={key}
              className="flex items-center gap-1.5 text-xs text-gray-600"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span>
                {stageLabel} ({count})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SrsBreakdownBar;
