import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { BunproData } from "types/japanese";
import SrsBreakdownBar from "./SrsBreakdownBar";

type Props = {
  data: BunproData;
};

const jlptLevels = ["n5", "n4", "n3", "n2", "n1"] as const;

const BunproStats = ({ data }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-6">
      <p className="text-gray-700 leading-relaxed">
        Grammar is the backbone of understanding. Through{" "}
        <a
          href="https://bunpro.jp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
          style={{ color: "#EEB868" }}
        >
          Bunpro
        </a>
        , I&apos;m working through JLPT grammar points &mdash;{" "}
        <span className="font-semibold">
          {data.totalGrammar.toLocaleString()}
        </span>{" "}
        studied so far.
      </p>

      <div className="space-y-3">
        {jlptLevels.map((level, i) => {
          const { learned, total } = data.jlptProgress[level];
          const percentage = total > 0 ? (learned / total) * 100 : 0;

          return (
            <div key={level}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-RobotoMono text-gray-600 uppercase">
                  {level}
                </span>
                <span className="text-gray-400">
                  {learned}/{total}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#EEB868" }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <SrsBreakdownBar breakdown={data.srsBreakdown} label="Grammar SRS" />
    </div>
  );
};

export default BunproStats;
