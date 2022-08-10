import type { GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";

import { Layout, BlogPostListItem } from "components";
import { BlogPost } from "types/blog";
import calculateReadTime from "utils/calculate-read-time";
import dayjs from "dayjs";
import sortBlogPosts from "utils/sort-blog-posts";

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
          <BlogPostListItem key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
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
    } as BlogPost;
  });

  return {
    props: {
      posts: sortBlogPosts(posts, "DESC"),
    },
  };
};
