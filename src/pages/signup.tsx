import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { PasswordField } from "../components/PasswordField";

const Signup: NextPage = () => {
  return (
    <Box
      bg="gray.50"
      maxW="container.sm"
      p={4}
      m="auto"
      mt={10}
      borderRadius="md"
      boxShadow="xs"
      rounded="lg"
      textAlign={"center"}
    >
      <Stack spacing="3">
        <Text fontSize="3xl" fontWeight="bold" as="h1">
          SkinCure.
        </Text>
        <Text>
          SkinCure is a platform that allows you to connect with other people
        </Text>
        <Text fontSize="lg" fontWeight="semibold" as="h2">
          Create An Account
        </Text>
        <Text fontSize="sm" as="h3" color="muted">
          Already have an account? <Link href="/login">Login</Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Signup;
