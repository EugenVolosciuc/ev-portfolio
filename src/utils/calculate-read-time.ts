import markdownToTxt from "markdown-to-txt";

const wpm = 200;

const calculateReadTime = (content: string, isMarkdown: boolean = false) => {
  let text = content;
  if (isMarkdown) text = markdownToTxt(content);

  const words = text.trim().split(/\s+/).length;

  return Math.ceil(words / wpm);
};

export default calculateReadTime;
