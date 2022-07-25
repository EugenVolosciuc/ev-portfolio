import type { NextPage } from "next";
import Link from "next/link";

import { Button, Cursor } from "components";
import Image from "next/image";
import { useCursorRotation } from "components/Cursor";

const menuItems = {
  about: {
    label: "My story",
    url: "/about",
  },
  blog: {
    label: "Blog",
    url: "/blog",
  },
  projects: {
    label: "Projects",
    url: "/projects",
  },
  contact: {
    label: "Get in touch",
    url: "/contact",
  },
};

const Home: NextPage = () => {
  useCursorRotation("a", true);

  return (
    <div className="cursor-none h-screen flex relative">
      <Cursor />
      <main className="container mx-auto self-center text-center -mt-16 px-4">
        <Image
          className="z-1"
          src="/assets/images/avatar.svg"
          layout="intrinsic"
          width="180px"
          height="180px"
          alt="Eugen's avatar"
        />
        <h1 className="font-bold mt-2 text-3xl md:text-4xl">Eugen Voloșciuc</h1>
        <h2 className="font-semibold text-lg md:text-xl">Web developer</h2>
        <p className="mt-2 max-w-xl mx-auto md:text-lg">
          I can help your start-up and agency achieve high quality websites and
          exceptional user experience.
        </p>
      </main>
      <nav className="absolute w-full flex justify-between p-6 md:p-10">
        <Link href={menuItems.about.url} passHref>
          <Button>{menuItems.about.label}</Button>
        </Link>
        <Link href={menuItems.blog.url} passHref>
          <Button>{menuItems.blog.label}</Button>
        </Link>
      </nav>
      <nav className="absolute w-full flex justify-between p-6 md:p-10 bottom-0">
        <Link href={menuItems.projects.url} passHref>
          <Button>{menuItems.projects.label}</Button>
        </Link>
        <Link href={menuItems.contact.url} passHref>
          <Button>{menuItems.contact.label}</Button>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
