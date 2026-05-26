import dayjs from "dayjs";
import { motion } from "framer-motion";
import type { WKUser, SrsBreakdown, ItemCounts } from "types/japanese";
import SrsBreakdownBar from "./SrsBreakdownBar";

type Props = {
  user: WKUser;
  srsBreakdown: SrsBreakdown;
  totalItems: ItemCounts;
};

const WanikaniStats = ({ user, srsBreakdown, totalItems }: Props) => {
  const startDate = dayjs(user.started_at);
  const now = dayjs();
  const months = now.diff(startDate, "month");
  const duration =
    months >= 12
      ? `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""} and ${months % 12} month${months % 12 !== 1 ? "s" : ""}`
      : `${months} month${months !== 1 ? "s" : ""}`;

  const totalLearned =
    totalItems.radicals + totalItems.kanji + totalItems.vocabulary;

  return (
    <div className="space-y-6">
      <p className="text-gray-700 leading-relaxed">
        I&apos;m currently on{" "}
        <span className="font-bold" style={{ color: "#EEB868" }}>
          Level {user.level}
        </span>{" "}
        of WaniKani. I&apos;ve been chipping away at kanji for {duration},
        and so far I&apos;ve studied{" "}
        <span className="font-semibold">{totalLearned.toLocaleString()}</span>{" "}
        items.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Radicals", count: totalItems.radicals, emoji: "部" },
          { label: "Kanji", count: totalItems.kanji, emoji: "漢" },
          { label: "Vocabulary", count: totalItems.vocabulary, emoji: "語" },
        ].map(({ label, count, emoji }, i) => (
          <motion.div
            key={label}
            className="text-center p-4 rounded-lg bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-2xl mb-1">{emoji}</p>
            <p className="text-2xl font-bold text-gray-800">
              {count.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{label}</p>
          </motion.div>
        ))}
      </div>

      <SrsBreakdownBar breakdown={srsBreakdown} label="SRS Progress" />
    </div>
  );
};

export default WanikaniStats;
