import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StudyLogPost } from "types/japanese";
import StudyLogEntry from "./StudyLogEntry";

type Props = {
  posts: StudyLogPost[];
};

const INITIAL_COUNT = 10;

const StudyLog = ({ posts }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? posts : posts.slice(0, INITIAL_COUNT);
  const hasMore = posts.length > INITIAL_COUNT;

  return (
    <div>
      <p className="text-gray-700 leading-relaxed mb-6">
        I keep an accountability log on the{" "}
        <a
          href="https://community.bunpro.jp/t/fujimaros-study-and-accountability-log/185773"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
          style={{ color: "#EEB868" }}
        >
          Bunpro community forums
        </a>
        . Here are my entries, newest first.
      </p>

      <div>
        {visible.map((post) => (
          <StudyLogEntry key={post.post_number} post={post} />
        ))}
      </div>

      <AnimatePresence>
        {hasMore && !showAll && (
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-RobotoMono underline underline-offset-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              Show all {posts.length} entries
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyLog;
