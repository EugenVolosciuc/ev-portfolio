import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="fbd0eaa2-daa7-429a-8557-13e88218650c"
          ></script>
          <link
            rel="preload"
            href="/fonts/RobotoMono-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Lora-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Lora-SemiBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Lora-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
