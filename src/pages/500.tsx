import { Text, Container } from "@chakra-ui/react";

export default function Error() {
  return (
    <Container
      minW="100%"
      minH={"100vh"}
      bgColor={"blackAlpha.900"}
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize="2xl" color="white" textAlign="center" fontWeight="bold">
        An error has occured. There may be some problem with your internet.
      </Text>
    </Container>
  );
}
