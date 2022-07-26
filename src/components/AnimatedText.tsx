import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

// https://codesandbox.io/s/framer-motion-react-wavy-letter-text-animation-j69kkr?from-embed=&file=/src/App.tsx
const AnimatedText: FC<Props> = ({
  text,
  delay = 0,
  duration = 0.05,
  className = "",
  ...props
}: Props) => {
  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div className="flex flex-col">
      {text.split("\n").map((sentence) => {
        const letters = Array.from(sentence);

        return (
          <motion.p
            key={sentence} // https://stackoverflow.com/questions/69051279/how-to-animate-on-each-state-change-using-framer-motion
            className={`flex flex-wrap overflow-hidden text-sm ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            {...props}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>
        );
      })}
    </div>
  );
};

export default AnimatedText;
