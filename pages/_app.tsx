import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import useHeader from "hooks/useHeader";
import "github-markdown-css";

function MyApp({ Component, pageProps }: AppProps) {
  const { header } = useHeader();
  return (
    <div className={"h-screen w-screen overflow-hidden"}>
      <Head>
        <title>{`Keyu's Website`}</title>
        <meta name="description" content="keyu's website" />
      </Head>
      <div className={'h-[calc(100%-4rem)] mt-16 overflow-y-auto'}>
        {header}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
