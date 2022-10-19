import { Box, Divider, VStack } from "@chakra-ui/react";
import SearchBox from "../SearchBox";

interface IPatientMain {
  doctorList : 
}

export default function PatientMain() {
  return (
    <Box py={"30px"} px={["20px", "50px", "100px"]} width={"100%"}>
      <VStack spacing={'20px'}>
        <SearchBox />
        <Divider width={"100%"} />
        
      </VStack>
    </Box>
  );
}
