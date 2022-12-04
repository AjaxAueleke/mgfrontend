import {
  Box,
  Button,
  Center,
  Divider,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { IDoctor } from "../../pages/patient";
import DoctorCard from "../Card";
import AppointmentModal from "../Modal";
import SearchBox from "../SearchBox";

interface IPatientMain {
  doctorList: Array<IDoctor>;
  isLoading: Boolean;
  onClickSearch: (e: any) => void;
  onChangeSearch: (e: any) => void;
  getNearestDoctors: (e: any) => void;
}

export default function PatientMain(props: IPatientMain) {
  const { doctorList, isLoading } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const router = useRouter();
  const handleOnClose = () => {
    onClose();
    setSelectedDoctor(null);
    router.replace(router.asPath);
  };
  const handleOnOpen = (doctor: IDoctor) => {
    setSelectedDoctor(doctor);
    onOpen();
  };
  return (
    <Box py={"30px"} px={["20px", "50px", "100px"]} width={"100%"}>
      <VStack spacing={"20px"}>
        <Stack>
          <SearchBox
            onChange={props.onChangeSearch}
            onClick={props.onClickSearch}
          />
          <Button
            onClick={props.getNearestDoctors}
            colorScheme="teal"
            variant="outline"
          >
            Get Nearest Doctors
          </Button>
        </Stack>

        <Divider width={"100%"} />
        {isLoading ? (
          <Center w="100%" h="100vh">
            <Spinner size="md" color="teal.500" />
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 2, 3]} w={"100%"} spacing={"6"}>
            {doctorList.map((doctor: IDoctor) => (
              <DoctorCard
                key={doctor.userId}
                doctor={doctor}
                onOpen={handleOnOpen}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>

      <AppointmentModal
        isOpen={isOpen}
        onClose={handleOnClose}
        bookAnAppointment={function (): void {
          router.push(`/doctor/${selectedDoctor?.userId}`);
        }}
        doctor={selectedDoctor}
      />
    </Box>
  );
}
