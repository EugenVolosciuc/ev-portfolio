import type { NextPage } from "next";
import Head from "next/head";
import {
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaFilePdf,
} from "react-icons/fa";

import { Layout } from "components";

const Contact: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contact | Eugen Volosciuc</title>
      </Head>
      <div className="container mx-auto max-w-prose pt-16 px-4">
        <h1 className="font-extrabold text-4xl mb-2">Let&apos;s connect!</h1>
        <p className="mb-4">
          If you&apos;ve got a project on your hands that needs a helping hand
          with its frontend or backend, let&apos;s talk.
        </p>
        <div className="flex justify-around mb-4 mt-2">
          <a
            href="https://www.linkedin.com/in/eugen-volosciuc/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="text-2xl" title="LinkedIn Profile" />
          </a>
          <a
            href="https://medium.com/@volosciuc-eugen"
            target="_blank"
            rel="noreferrer"
          >
            <FaMedium className="text-2xl" title="Medium Profile" />
          </a>
          <a
            href="https://stackoverflow.com/users/12058223/eugen-volo%c8%99ciuc"
            target="_blank"
            rel="noreferrer"
          >
            <FaStackOverflow
              className="text-2xl"
              title="StackOverflow Profile"
            />
          </a>
          <a href="/assets/EV_CV.pdf" download={true}>
            <FaFilePdf className="text-2xl" title="Resume" />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
