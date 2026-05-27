import { motion } from "framer-motion";
import type { WordOfTheDay as WordOfTheDayType } from "types/japanese";

type Props = {
  word: WordOfTheDayType;
};

const WordOfTheDay = ({ word }: Props) => {
  return (
    <div>
      <p className="text-gray-500 mb-4 italic">
        Here&apos;s something I&apos;ve been learning recently:
      </p>
      <motion.div
        className="inline-block border border-gray-200 rounded-xl p-8 bg-white shadow-sm"
        whileHover={{ scale: 1.03, shadow: "0 8px 30px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <p
          className="text-6xl md:text-7xl text-center mb-4"
          style={{ color: "#EEB868" }}
        >
          {word.characters}
        </p>
        <div className="text-center space-y-1">
          {word.readings.length > 0 && (
            <p className="text-lg text-gray-600 font-RobotoMono">
              {word.readings.join("、")}
            </p>
          )}
          <p className="text-gray-500">{word.meanings.join(", ")}</p>
          <p className="text-xs text-gray-400 mt-2">
            Level {word.level} &middot;{" "}
            {/* {word.type === "kanji" ? "Kanji" : "Vocabulary"} */}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WordOfTheDay;
