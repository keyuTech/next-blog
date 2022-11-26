import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import useHeader from "hooks/useHeader";
import "github-markdown-css";

function MyApp({ Component, pageProps }: AppProps) {
  const { header } = useHeader();
  return (
    <div className={"h-screen w-screen overflow-hidden"}>
      <div>
        {header}
        <div className={"mt-16"}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
