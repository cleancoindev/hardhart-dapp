// import App from "next/app"
import type { AppProps /*, app context */ } from 'next/app';

// import '../../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from '../components/Layout';
import { SymfoniContext } from "../hardhat/SymfoniContext";

// @ts-ignore-next
import Head from 'next/head';
import '../../styles/globals.css'
import ErrorBoundary from '../components/Error/errorboundary';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps, router }: AppProps) {
  // Router
  const Router = useRouter();

  useEffect(() => {
    if (!window) return;
    window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
      // log errors
      console.error(event);
      console.error(error);

      setTimeout(() => {
        // push our error page
        Router.push("/error");
      }, 3000);
    };
  }, []);

  return (
    <ChakraProvider>
      {/* <SymfoniContext> */}
        <Layout>
          <ErrorBoundary key={router.asPath}>
            <Head>
              <title>PolyBread</title>
            </Head>
            <Component {...pageProps} />

          </ErrorBoundary>
        </Layout>
      {/* </SymfoniContext> */}
    </ChakraProvider>

  )
}

export default MyApp
