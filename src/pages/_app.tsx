import type { AppProps } from "next/app";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Eugen Volosciuc</title>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
