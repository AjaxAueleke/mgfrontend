import type { NextPage } from "next";
import { useColorMode, Button, Box, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/auth";
import { useEffect } from "react";
const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const auth = useSelector(selectAuthState);
  useEffect(() => {
    console.log(auth);
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);
  return (
    <VStack padding="10">
      <Text fontSize="4xl" fontWeight="bold" as="h1">
        Chakra UI
      </Text>
      <Text fontSize="2xl" fontWeight="semibold" as="h2">
        Rendering in {colorMode} mode
      </Text>
      <Button aria-label="UI Theme" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "dark" : "light"}
        mode
      </Button>
    </VStack>
  );
};

export default Home;
