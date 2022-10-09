import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import TopBar from "../components/TopBar";
import {wrapper } from "../modules/store"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* <TopBar /> */}
      <Box maxWidth="container.xl" margin="auto">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
