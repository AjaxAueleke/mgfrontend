import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { IDoctor } from "../../pages/patient";

export interface IDoctorCard {
  doctor: IDoctor;
}
export default function DoctorCard(props: IDoctorCard) {
  const { doctor } = props;
  return (
    <Box
      maxW={"445px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="outline"
      rounded={"sm"}
      overflow={"hidden"}
      padding="10"
    >
      <Flex justify={"center"}>
        <Avatar
          size={"xl"}
          src={doctor.photo}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {doctor.name}
          </Heading>
          <Text color={"gray.500"}>{doctor.qualifications?.join(', ')}</Text>
          <Text color={"gray.500"}>{doctor.specializedtreatments?.join(', ')}</Text>
        </Stack>

        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Followers
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Followers
            </Text>
          </Stack>
        </Stack>

        <Button
          w={"full"}
          mt={8}
          bg={useColorModeValue("#151f21", "gray.900")}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          Follow
        </Button>
      </Box>
    </Box>
  );
}
