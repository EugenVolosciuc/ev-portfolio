import dayjs from "dayjs";
import { motion } from "framer-motion";
import { markdownProseClasses } from "constants/classnames";
import type { StudyLogPost } from "types/japanese";

type Props = {
  post: StudyLogPost;
};

const StudyLogEntry = ({ post }: Props) => {
  return (
    <motion.article
      className="border-b border-gray-100 pb-6 mb-6 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <time className="text-sm text-gray-400 font-RobotoMono block mb-3">
        {dayjs(post.created_at).format("MMMM D, YYYY")}
      </time>
      <div
        className={markdownProseClasses}
        dangerouslySetInnerHTML={{ __html: post.cooked }}
      />
    </motion.article>
  );
};

export default StudyLogEntry;
