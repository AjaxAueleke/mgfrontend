import {
  Box,
  Center,
  Divider,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { IDoctor } from "../../pages/patient";
import DoctorCard from "../Card";
import SearchBox from "../SearchBox";

interface IPatientMain {
  doctorList: Array<IDoctor>;
  isLoading: Boolean;
}

export default function PatientMain(props: IPatientMain) {
  const { doctorList, isLoading } = props;
  return (
    <Box py={"30px"} px={["20px", "50px", "100px"]} width={"100%"}>
      <VStack spacing={"20px"}>
        <SearchBox />
        <Divider width={"100%"} />
        {isLoading ? (
          <Center w="100%" h="100vh">
            <Spinner size="md" color="teal.500" />
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 2,3]} w={"100%"} spacing={"6"}>
            {doctorList.map((doctor: IDoctor) => (
              <DoctorCard key={doctor.userId} doctor={doctor} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
}
