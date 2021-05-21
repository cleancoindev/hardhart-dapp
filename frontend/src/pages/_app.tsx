// import App from "next/app"
import type { AppProps /*, app context */ } from 'next/app';

import '../../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import { SymfoniContext } from "../hardhat/SymfoniContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SymfoniContext>
        <Component {...pageProps} />
      </SymfoniContext>
    </ChakraProvider>

  )
}

export default MyApp
