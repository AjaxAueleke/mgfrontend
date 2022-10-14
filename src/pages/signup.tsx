import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import emailValidator from "../util/emailValidator";
interface IError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}
const Signup: NextPage = () => {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [phone, setPhone] = useState<String>("");
  const [errors, setErrors] = useState<IError>({});
  const [apiError, setApiError] = useState<String>("");
  const router = useRouter();

  const submitHandler = async (e: any) => {
    console.log("RUNNING");
    e.preventDefault();
    console.log(errors);
    if (name.trim() === "") {
      setErrors((prevState: IError) => ({
        ...prevState,
        name: "Name is required",
      }));
    } else {
      setErrors((prevState: IError) => ({
        ...prevState,
        name: "",
      }));
    }
    if (email.trim() === "") {
      setErrors((prevState: IError) => ({
        ...prevState,
        email: "Email is required",
      }));
    } else if (!emailValidator(email)) {
      setErrors((prevState: IError) => ({
        ...prevState,
        email: "Invalid email",
      }));
    } else {
      setErrors((prevState: IError) => ({
        ...prevState,
        email: "",
      }));
    }

    if (password.trim() === "") {
      setErrors((prevState: IError) => ({
        ...prevState,
        password: "Password is required",
      }));
    } else if (confirmPassword.trim() === "") {
      setErrors((prevState: IError) => ({
        ...prevState,
        confirmPassword: "Confirm password is required",
      }));
    } else if (confirmPassword !== password) {
      setErrors((prevState: IError) => ({
        ...prevState,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevState: IError) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
    }
    if (password !== confirmPassword) {
      setErrors((prevState: IError) => ({
        ...prevState,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevState: IError) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
    }
    if (phone.trim() === "") {
      setErrors((prevState: IError) => ({
        ...prevState,
        phone: "Phone number is required",
      }));
    } else {
      setErrors((prevState: IError) => ({
        ...prevState,
        phone: "",
      }));
    }

    // if there are no errors, post data
    if (Object.keys(errors).length === 0) {
      // const res = await fetch("/api/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //     phone,
      //   }),
      // });
      // const data = await res.json();
      // if (data.errors) {
      //   setApiError(data.errors[0].message);
      // }
      // if (data.user) {
      //   router.push("/login");
      // }
    }
  };

  return (
    <Box
      maxW="container.sm"
      py={4}
      px={"10"}
      m="auto"
      mx={["10px", "auto", "auto", "auto"]}
      mt={5}
      borderRadius="md"
      boxShadow="xs"
      rounded="lg"
      textAlign={"center"}
    >
      <Stack spacing="2">
        <Text fontSize="3xl" fontWeight="bold" as="h1">
          SkinCure.
        </Text>
        <Text fontSize="lg" fontWeight="semibold" as="h2">
          Create An Account
        </Text>
      </Stack>

      <Stack spacing="4" mt="4">
        <form onSubmit={submitHandler}>
          <Box>
            <FormControl
              isRequired={true}
              isInvalid={errors.name !== undefined && errors.name !== ""}
            >
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                id="1"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errors.name && (
                <FormErrorMessage color="red.500">
                  {errors.name}
                </FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isRequired={true}
              isInvalid={errors.email !== undefined && errors.email !== ""}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                id="2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email !== "" ? (
                <FormErrorMessage color="red.500">
                  {errors.email}
                </FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isRequired={true}
              isInvalid={errors.phone !== undefined && errors.phone !== ""}
            >
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                id="3"
                onChange={(e) => {
                  {
                    setPhone(e.target.value);
                  }
                }}
              />
              {errors.phone ? (
                <FormErrorMessage color="red.500">
                  {errors.phone}
                </FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isRequired={true}
              isInvalid={
                errors.password !== undefined && errors.password !== ""
              }
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                id="4"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <FormErrorMessage color="red.500">
                  {errors.password}
                </FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl
              isRequired={true}
              isInvalid={
                errors.confirmPassword !== undefined &&
                errors.confirmPassword !== ""
              }
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                id="5"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {errors.confirmPassword ? (
                <FormErrorMessage color="red.500">
                  {errors.confirmPassword}
                </FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
        </form>
      </Stack>
      <Box my={5}>
        <Button
          mx="auto"
          size="md"
          colorScheme={"teal"}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </Box>
      <Stack mt={6} spacing={4}>
        <Divider />
        <Text fontSize="sm" as="h3" color="muted">
          Already a user?{" "}
          <NextLink href={"/login"}>
            <Link color="teal.500">Login</Link>
          </NextLink>
        </Text>
      </Stack>
    </Box>
  );
};

export default Signup;
