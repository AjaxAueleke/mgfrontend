import { Box, Heading } from "@chakra-ui/react";
import SearchBox from "../SearchBox";

export default function PatientMain() {
  return (
    <Box py={"30px"} px={["20px", "50px", "100px"]} width={"100%"}>
        <SearchBox />
      <Heading>Home</Heading>
    </Box>
  );
}
