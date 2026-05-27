import Head from "next/head";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import type { GetStaticProps, NextPage } from "next";

import { Layout } from "components";
import type { JapanesePageProps } from "types/japanese";
import { fetchAllWanikaniData } from "lib/wanikani";
import { fetchBunproStats } from "lib/bunpro";
import { fetchStudyLog } from "lib/discourse";

import WordOfTheDay from "components/japanese/WordOfTheDay";
import WanikaniStats from "components/japanese/WanikaniStats";
import JourneyTimeline from "components/japanese/JourneyTimeline";
import BunproStats from "components/japanese/BunproStats";
import StudyLog from "components/japanese/StudyLog";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Japanese: NextPage<JapanesePageProps> = ({
  wanikani,
  bunpro,
  studyLog,
  fetchedAt,
}) => {
  return (
    <Layout>
      <Head>
        <title>My Japanese Journey | Eugen Volosciuc</title>
      </Head>

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        {/* Hero */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            My Japanese Learning Journey
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Somewhere along the way, I fell in love with Japanese. Between
            raising a kid and building software, I carve out time each day to
            study kanji, vocabulary, and grammar. It&apos;s slow, it&apos;s
            humbling, and it&apos;s one of the most rewarding things I do.
          </p>
          <p className="text-xs text-gray-400 mt-4 font-RobotoMono">
            Last updated {dayjs(fetchedAt).format("MMMM D, YYYY")}
          </p>
        </motion.section>

        {/* Word of the Day */}
        {wanikani?.wordOfTheDay && (
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
          >
            <WordOfTheDay word={wanikani.wordOfTheDay} />
          </motion.section>
        )}

        {/* WaniKani Stats */}
        {wanikani && (
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">The Journey So Far</h2>
            <WanikaniStats
              user={wanikani.user}
              srsBreakdown={wanikani.srsBreakdown}
              totalItems={wanikani.totalItems}
            />
          </motion.section>
        )}

        {/* Journey Timeline */}
        {wanikani && wanikani.levelProgressions.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
          >
            <JourneyTimeline
              levelProgressions={wanikani.levelProgressions}
              currentLevel={wanikani.user.level}
            />
          </motion.section>
        )}

        {/* Bunpro Stats */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Grammar Corner</h2>
          {bunpro ? (
            <BunproStats data={bunpro} />
          ) : (
            <p className="text-gray-400 italic text-sm">
              Bunpro stats are currently unavailable. Check back later!
            </p>
          )}
        </motion.section>

        {/* Study Log */}
        {studyLog.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Study Journal</h2>
            <StudyLog posts={studyLog} />
          </motion.section>
        )}

        {/* Footer note */}
        <motion.footer
          className="text-xs text-gray-400 text-center pt-8 border-t border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.5 }}
        >
          <p>
            Data pulled from{" "}
            <a
              href="https://www.wanikani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              WaniKani
            </a>{" "}
            and{" "}
            <a
              href="https://bunpro.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bunpro
            </a>
            . Study log from the{" "}
            <a
              href="https://community.bunpro.jp/t/fujimaros-study-and-accountability-log/185773"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bunpro community forums
            </a>
            .
          </p>
        </motion.footer>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<JapanesePageProps> = async () => {
  const wkToken = process.env.WANIKANI_API_TOKEN;
  const bunproToken = process.env.BUNPRO_FRONTEND_TOKEN;
  const topicId = process.env.DISCOURSE_TOPIC_ID || "185773";
  const discourseUser = process.env.DISCOURSE_USERNAME || "";

  const [wanikani, bunpro, studyLog] = await Promise.all([
    wkToken ? fetchAllWanikaniData(wkToken).catch(() => null) : null,
    bunproToken ? fetchBunproStats(bunproToken).catch(() => null) : null,
    discourseUser
      ? fetchStudyLog(topicId, discourseUser).catch(() => [])
      : Promise.resolve([]),
  ]);

  return {
    props: {
      wanikani,
      bunpro,
      studyLog,
      fetchedAt: new Date().toISOString(),
    },
    revalidate: 3600,
  };
};

export default Japanese;
