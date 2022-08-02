import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

import { Layout } from "components";
import { markdownProseClasses } from "constants/classnames";

const Projects = ({
  projectsContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>Projects | Eugen Volosciuc</title>
      </Head>
      <div className={`${markdownProseClasses} mx-auto pt-16 px-4`}>
        <div
          dangerouslySetInnerHTML={{
            __html: md({ html: true }).render(projectsContent),
          }}
        />
      </div>
    </Layout>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps<{
  projectsContent: any;
}> = async () => {
  const fileName = fs.readFileSync(`src/content/projects.md`, "utf-8");
  const { content } = matter(fileName);

  return {
    props: {
      projectsContent: content,
    },
  };
};
