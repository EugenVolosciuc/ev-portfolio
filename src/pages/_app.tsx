import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Web developer working on both frontend and backend with experience in a wide range of digital products"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
