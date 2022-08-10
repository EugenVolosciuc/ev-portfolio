import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";

import { Layout, BlogPostListItem } from "components";
import { BlogPost } from "types/blog";
import calculateReadTime from "utils/calculate-read-time";
import sortBlogPosts from "utils/sort-blog-posts";

const BlogTagPage = ({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${tag} | Eugen Volosciuc`;
  const description = `Blog posts about ${tag}`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container mx-auto max-w-prose pt-16 px-4">
        <h1 className="font-extrabold text-4xl mb-2">{description}</h1>
        <hr className="mb-4" />
        {posts.map((post) => (
          <BlogPostListItem key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default BlogTagPage;

export const getStaticProps: GetStaticProps<{
  posts: BlogPost[];
  tag: string;
}> = async ({ params }) => {
  const files = fs.readdirSync("src/content/blog-posts");

  const filteredPosts = files.reduce<BlogPost[]>((acc, currentFileName) => {
    const slug = currentFileName.replace(".md", "");
    const readFile = fs.readFileSync(
      `src/content/blog-posts/${currentFileName}`,
      "utf-8"
    );
    const { data: frontmatter, content } = matter(readFile);

    if (frontmatter.tags.includes((params as ParsedUrlQuery).tag)) {
      acc.push({
        slug,
        frontmatter,
        readTime: calculateReadTime(content, true),
      } as BlogPost);
    }

    return acc;
  }, []);

  return {
    props: {
      posts: sortBlogPosts(filteredPosts, "DESC"),
      tag: params?.tag as string,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = fs.readdirSync("src/content/blog-posts");

  const tags = new Set<string>();

  fileNames.forEach((fileName) => {
    const file = fs.readFileSync(`src/content/blog-posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(file);

    if (frontmatter.tags) {
      (frontmatter.tags as string[]).forEach((tag) => tags.add(tag));
    }
  });

  return {
    paths: Array.from(tags).map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};
