import type { AppProps } from "next/app";
import Head from "next/head";
import useHeader from "hooks/useHeader";
import logo from '../public/seele-logo.svg'
import "styles/globals.css";
import "github-markdown-css";


function MyApp({ Component, pageProps }: AppProps) {
  const { header } = useHeader();
  return (
    <div className={"h-full w-screen overflow-hidden"}>
      <Head>
        <title>{`Keyu's Website`}</title>
        <meta name="description" content="keyu's website" />
        <link rel="shortcut icon" href={logo.src} />
      </Head>
      <div className={'h-[calc(100%-4rem)] mt-16 overflow-y-auto font-poppins'}>
        {header}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
