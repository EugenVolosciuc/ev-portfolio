import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import { AnimatedText, Button, Cursor } from "components";
import Image from "next/image";
import { useCursorRotation } from "components/Cursor";
import delay from "utils/delay";

type ButtonMovementDirection =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type ButtonVariantsCustom = {
  i: number;
  direction: ButtonMovementDirection;
};

const carreerStart = 2019;
const yearsOfExperience = new Date().getFullYear() - carreerStart;

const buttonDisplacement = 25;
const initButtonsDelay = 0.15;
const individualButtonDelay = 0.18;
const speachBubbleDuration = 1;

const buttonVariants: Variants = {
  hidden: ({ direction }: ButtonVariantsCustom) => {
    const coordinates = { x: 0, y: 0 };

    switch (direction) {
      case "top-left":
        coordinates.x = -buttonDisplacement;
        coordinates.y = -buttonDisplacement;
        break;
      case "top-right":
        coordinates.x = buttonDisplacement;
        coordinates.y = -buttonDisplacement;
        break;
      case "bottom-left":
        coordinates.x = -buttonDisplacement;
        coordinates.y = buttonDisplacement;
        break;
      case "bottom-right":
        coordinates.x = buttonDisplacement;
        coordinates.y = buttonDisplacement;
        break;
    }

    return { opacity: 0, x: coordinates.x, y: coordinates.y };
  },
  visible: ({ i }: ButtonVariantsCustom) => {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        delay: initButtonsDelay + i * individualButtonDelay,
      },
    };
  },
};

const infoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "tween" },
  },
};

const speechBubbleSVGVariants: Variants = {
  hidden: { filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.0))", scale: 1.15 },
  visible: {
    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))",
    transition: {
      type: "tween",
      delay: speachBubbleDuration,
      ease: "easeOut",
    },
  },
};

const speechBubblePathVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      delay: initButtonsDelay,
      duration: speachBubbleDuration,
      ease: "easeOut",
    },
  },
};

const menuItems = {
  about: {
    label: "My story",
    url: "/about",
  },
  blog: {
    label: "Blog",
    url: "/blog",
  },
  projects: {
    label: "Projects",
    url: "/projects",
  },
  contact: {
    label: "Get in touch",
    url: "/contact",
  },
};

const speechBubbleTexts = [
  {
    content: "Hi there, I'm Eugen.\nGreat seeing you!",
    duration: speachBubbleDuration * 2.8 * 1000,
  },
  {
    content: "You can check some\nof my projects down\nbelow..",
    duration: 2500,
    callback() {
      const projectsBtn = document.querySelector(
        "#projects-btn"
      ) as HTMLElement | null;
      if (projectsBtn) projectsBtn.focus();
    },
  },
  {
    content: "..or find out more\nabout my life and work\nexperience up above.",
    duration: 2500,
    callback() {
      const aboutBtn = document.querySelector(
        "#about-btn"
      ) as HTMLElement | null;
      if (aboutBtn) aboutBtn.focus();
    },
  },
  {
    content: "I also try to\nwrite some blog\nposts from time\nto time.",
    duration: 2500,
    callback() {
      const blogBtn = document.querySelector("#blog-btn") as HTMLElement | null;
      if (blogBtn) blogBtn.focus();
    },
  },
  {
    content:
      "I'm open for work!\nHit me up and let's\nbuild something\nawesome!",
    duration: 2500,
    async callback() {
      const contactBtn = document.querySelector(
        "#contact-btn"
      ) as HTMLElement | null;

      if (contactBtn) {
        contactBtn.focus();
        await delay(2500);
        contactBtn.blur();
      }
    },
  },
];

const SpeechBubble = () => {
  const speechBubbleLoaded = useRef<boolean>(false);
  const [currentTextIndex, setCurrentText] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let i = 0;
      for await (const { callback } of speechBubbleTexts) {
        // The first text is already set, skip it
        if (speechBubbleTexts[i - 1]) {
          await delay(speechBubbleTexts[i - 1].duration);
          speechBubbleLoaded.current = true;
          setCurrentText(i);
          if (callback) callback();
        }
        i++;
      }
    })();
  }, []);

  return (
    <>
      <motion.svg
        initial="hidden"
        animate="visible"
        variants={speechBubbleSVGVariants}
        width="172"
        height="147"
        viewBox="0 0 172 147"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial="hidden"
          animate="visible"
          variants={speechBubblePathVariants}
          strokeWidth={3}
          d="M86 140C132.944 140 171 108.884 171 70.5C171 32.1162 132.944 1 86 1C39.0558 1 1 32.1162 1 70.5C1 87.746 8.68247 103.525 21.4019 115.673L13 145.5L44.7338 131.275C56.9534 136.833 71.0244 140 86 140Z"
          stroke="black"
        />
      </motion.svg>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ width: 180, height: 140 }}
      >
        <AnimatedText
          text={speechBubbleTexts[currentTextIndex].content}
          delay={speechBubbleLoaded.current ? 0 : speachBubbleDuration}
          duration={speechBubbleTexts[currentTextIndex].duration / 100000}
          className="font-mono"
        />
      </div>
    </>
  );
};

const Home: NextPage = () => {
  useCursorRotation("a", true);

  return (
    <div className="cursor-none h-screen flex relative">
      <Head>
        <title>Eugen Volosciuc</title>
      </Head>
      <Cursor />
      <motion.main
        initial="hidden"
        animate="visible"
        variants={infoVariants}
        className="relative container mx-auto self-center text-center mt-10 px-4"
      >
        <div
          className="hidden md:block absolute left-1/2 -top-24"
          style={{ left: "calc(50% + 50px)" }}
        >
          <SpeechBubble />
        </div>
        <Image
          className="z-1"
          src="/assets/images/avatar.svg"
          layout="intrinsic"
          width="180px"
          height="180px"
          alt="Eugen's avatar"
          priority
        />
        <h1 className="font-bold mt-2 text-3xl md:text-4xl">Eugen Voloșciuc</h1>
        <h2 className="font-semibold text-lg md:text-xl mt-2">
          Problem-solving web developer
        </h2>
        <p className="mt-2 max-w-xl mx-auto md:text-lg">
          {yearsOfExperience}+ years of helping start-ups and agencies build
          high quality websites and achieve exceptional user experience
        </p>
      </motion.main>
      <nav className="absolute w-full flex justify-between p-6 md:p-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          custom={{ i: 0, direction: "top-left" }}
        >
          <Link href={menuItems.about.url} passHref>
            <Button id="about-btn">{menuItems.about.label}</Button>
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          custom={{ i: 1, direction: "top-right" }}
        >
          <Link href={menuItems.blog.url} passHref>
            <Button id="blog-btn">{menuItems.blog.label}</Button>
          </Link>
        </motion.div>
      </nav>
      <nav className="absolute w-full flex justify-between p-6 md:p-10 bottom-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          custom={{ i: 2, direction: "bottom-left" }}
        >
          <Link href={menuItems.projects.url} passHref>
            <Button id="projects-btn">{menuItems.projects.label}</Button>
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          custom={{ i: 3, direction: "bottom-right" }}
        >
          <Link href={menuItems.contact.url} passHref>
            <Button id="contact-btn">{menuItems.contact.label}</Button>
          </Link>
        </motion.div>
      </nav>
    </div>
  );
};

export default Home;
