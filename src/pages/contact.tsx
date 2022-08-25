import type { NextPage } from "next";
import Head from "next/head";
import { useForm, ValidationError } from "@formspree/react";
import {
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaFilePdf,
} from "react-icons/fa";

import { Layout, Button } from "components";

const inputClasses =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4";

const Contact: NextPage = () => {
  const [state, handleSubmit] = useForm("xoqrgrey");

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
        <hr className="mb-4" />
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-semibold mb-1" htmlFor="name">
            What should I call you?
          </label>
          <input className={inputClasses} id="name" name="name" required />
          <label className="font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            className={inputClasses}
            id="email"
            type="email"
            name="email"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label className="font-semibold mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            rows={8}
            className={inputClasses}
            id="message"
            name="message"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          {state.succeeded && (
            <p className="mb-2 text-green-700">
              Thank you for getting in touch! I&apos;ll come back with a reply
              as soon as possible.
            </p>
          )}
          <div className="mt-2">
            <Button
              type="submit"
              disabled={state.submitting || state.succeeded}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
