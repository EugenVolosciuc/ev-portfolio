import type { GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

import { Layout } from "components";
import { markdownProseClasses } from "constants/classnames";

const About = ({
  aboutContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <div className={`${markdownProseClasses} mx-auto pt-16 px-4`}>
        <div
          dangerouslySetInnerHTML={{
            __html: md({ html: true }).render(aboutContent),
          }}
        />
      </div>
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps<{
  aboutContent: any;
}> = async () => {
  const fileName = fs.readFileSync(`src/content/about.md`, "utf-8");
  const { content } = matter(fileName);

  return {
    props: {
      aboutContent: content,
    },
  };
};
