import dayjs from "dayjs";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { WKLevelProgression } from "types/japanese";

type Props = {
  levelProgressions: WKLevelProgression[];
  currentLevel: number;
};

const JourneyTimeline = ({ levelProgressions, currentLevel }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      <p className="text-gray-500 mb-6 italic">The levels, one by one:</p>

      <div className="relative ml-4">
        {/* Vertical line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="space-y-3">
          {levelProgressions.map((lp, i) => {
            const isCurrent = lp.level === currentLevel;
            const date = lp.passed_at || lp.started_at || lp.created_at;
            const daysToComplete =
              lp.passed_at && lp.started_at
                ? dayjs(lp.passed_at).diff(dayjs(lp.started_at), "day")
                : null;

            return (
              <motion.div
                key={lp.level}
                className="flex items-center gap-4 pl-6 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {/* Dot */}
                <div className="absolute left-0 -translate-x-1/2">
                  {isCurrent ? (
                    <motion.div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: "#EEB868" }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(238, 184, 104, 0.4)",
                          "0 0 0 8px rgba(238, 184, 104, 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full border-2 bg-white"
                      style={{ borderColor: lp.passed_at ? "#EEB868" : "#d1d5db" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className={`font-RobotoMono text-sm ${isCurrent ? "font-bold" : ""}`}
                    style={isCurrent ? { color: "#EEB868" } : undefined}
                  >
                    Lv. {lp.level}
                  </span>
                  <span className="text-xs text-gray-400">
                    {dayjs(date).format("MMM YYYY")}
                  </span>
                  {daysToComplete !== null && (
                    <span className="text-xs text-gray-400">
                      ({daysToComplete}d)
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs font-RobotoMono text-gray-500">
                      ← current
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
