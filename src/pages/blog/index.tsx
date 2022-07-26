import type { GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";
import Link from "next/link";
import Head from "next/head";

import { Layout } from "components";
import { BlogPost as TBlogPost } from "types/blog";
import calculateReadTime from "utils/calculate-read-time";

const BlogPost = ({ post }: { post: TBlogPost }) => {
  const { title, catchphrase, date } = post.frontmatter;

  return (
    <div className="mb-2">
      <Link href="/blog/[slug]" as={`/blog/${post.slug}`} passHref>
        <a className="font-bold text-xl">{title}</a>
      </Link>
      <p className="mb-2">{catchphrase}</p>
      <div className="text-xs">
        <span>{dayjs(date, "YYYY-MM-DD").format("DD MMMM YYYY")}</span>
        <span> | </span>
        <span>{post.readTime} min read</span>
      </div>
    </div>
  );
};

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>Blog | Eugen Volosciuc</title>
      </Head>
      <div className="container mx-auto max-w-prose pt-16 px-4">
        <h1 className="font-extrabold text-4xl mb-2">
          A little bit about everything
        </h1>
        <p className="mb-4">
          Most of the time I&apos;m writing about the challenges I face while
          coding, but here and there I&apos;m trying to get away from my laptop
          and do..stuff. Expect Japanese, music, two cats and other attempts at
          having hobies.
        </p>
        <hr className="mb-4" />
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<{
  posts: TBlogPost[];
}> = async () => {
  const files = fs.readdirSync("src/content/blog-posts");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(
      `src/content/blog-posts/${fileName}`,
      "utf-8"
    );
    const { data: frontmatter, content } = matter(readFile);

    return {
      slug,
      frontmatter,
      readTime: calculateReadTime(content, true),
    } as TBlogPost;
  });

  return {
    props: {
      posts,
    },
  };
};
