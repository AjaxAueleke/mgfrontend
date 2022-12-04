import { Button, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/vercel.svg";
interface INavBar {
  cta: string;
}
export default function NavBar({ cta }: INavBar) {
  return (
    <Flex
      w="100%"
      px={"8"}
      py={"4"}
      align={"center"}
      justify={"space-between"}
      boxShadow="outline"
    >
      <Image src={Logo} height="25px" layout="responsive" alt="SkinCare log" />

      <HStack spacing={"6"}>
        <Button
          borderRadius="full"
          bg="whiteAlpha.50"
          borderStyle="solid"
          borderWidth={"2px"}
          textColor="teal.500"
          _hover={{ bg: "teal.500", textColor: "white" }}
        >
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
        <Button
          borderRadius="full"
          bg="teal.500"
          textColor="whiteAlpha.900"
          fontWeight={"bolder"}
        >
          <Link href={"/login"}>{cta}</Link>
        </Button>
      </HStack>
    </Flex>
  );
}
