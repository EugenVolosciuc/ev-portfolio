import dayjs from "dayjs";
import Link from "next/link";

import { BlogPost } from "types/blog";
import { Tag } from "components";

const BlogPostListItem = ({ post }: { post: BlogPost }) => {
  const { title, catchphrase, date } = post.frontmatter;

  return (
    <div className="mb-6">
      <Link
        href="/blog/[slug]"
        as={`/blog/${post.slug}`}
        className="font-bold text-xl"
      >
        {title}
      </Link>
      <p className="mb-2">{catchphrase}</p>
      <div className="text-xs">
        <span>{dayjs(date, "YYYY-MM-DD").format("DD MMMM YYYY")}</span>
        <span> | </span>
        <span>{post.readTime} min read</span>
      </div>
      <div className="mt-2">
        {post.frontmatter.tags.map((tag) => (
          <Link
            key={`blog-post-tag-${tag}`}
            href="/blog/tag/[tag]"
            as={`/blog/tag/${tag}`}
            className="mr-2"
          >
            <Tag>{tag}</Tag>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPostListItem;
