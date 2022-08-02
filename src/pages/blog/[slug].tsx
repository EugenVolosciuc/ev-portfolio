import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import dayjs from "dayjs";

import calculateReadTime from "utils/calculate-read-time";
import { Layout } from "components";
import { BlogPost as TBlogPost } from "types/blog";
import { markdownProseClasses } from "constants/classnames";
import Head from "next/head";

type BlogPostWithContent = TBlogPost & { content: string };

const BlogPost = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${post.frontmatter.title} | Eugen Volosciuc`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.frontmatter.catchphrase} />
      </Head>
      <div className={`${markdownProseClasses} mx-auto pt-16 px-4`}>
        <h1 className="mb-2">{post.frontmatter.title}</h1>
        <div className="text-xs">
          <span>
            {dayjs(post.frontmatter.date, "YYYY-MM-DD").format("DD MMMM YYYY")}
          </span>
          <span> | </span>
          <span>{post.readTime} min read</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: md({ html: true }).render(post.content),
          }}
        />
      </div>
    </Layout>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps<{
  post: BlogPostWithContent;
}> = async ({ params }) => {
  const fileName = fs.readFileSync(
    `src/content/blog-posts/${(params as ParsedUrlQuery).slug}.md`,
    "utf-8"
  );
  const { data: frontmatter, content } = matter(fileName);

  return {
    props: {
      post: {
        frontmatter,
        content,
        readTime: calculateReadTime(content, true),
      } as BlogPostWithContent,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("src/content/blog-posts");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
