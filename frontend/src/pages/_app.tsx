// import App from "next/app"
import type { AppProps /*, app context */ } from 'next/app';

import '../../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import { HardhatContext } from "../hardhat/HardhatContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>

  )
}

export default MyApp
