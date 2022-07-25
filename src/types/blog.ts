export type BlogPost = {
  slug: string;
  readTime: number;
  frontmatter: {
    title: string;
    date: string;
    categories: BlogPostCategories[];
    catchphrase: string;
  };
};

export enum BlogPostCategories {
  DEVELOPMENT = "Development",
}
