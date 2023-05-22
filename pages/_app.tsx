import { Session } from "next-auth";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

interface MyAppProps extends AppProps {
  pageProps: {
    session: Session;
  };
}

const App = ({ Component, pageProps }: MyAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>UKDoors.net</title>
        {/* <meta name="theme-color" content="#f0f0f0" /> */}
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
