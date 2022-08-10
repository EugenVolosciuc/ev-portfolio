import dayjs from "dayjs";

import { BlogPost } from "types/blog";

const sortBlogPosts = (posts: BlogPost[], order: "ASC" | "DESC") => {
  return posts.sort((a, b) => {
    const aTime = dayjs(a.frontmatter.date, "YYYY-MM-DD").toDate().getTime();
    const bTime = dayjs(b.frontmatter.date, "YYYY-MM-DD").toDate().getTime();
    if (order === "ASC") {
      return aTime - bTime;
    }

    return bTime - aTime;
  });
};

export default sortBlogPosts;
