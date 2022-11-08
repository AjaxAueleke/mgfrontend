import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IDoctor } from "../../pages/patient";
import { ISchedule } from "../../pages/patient";

export interface IAppointmentModalBody {
  doctor: IDoctor | null;
  onClick: () => void;
}
export default function AppointmentModalBody({
  doctor,
  onClick,
}: IAppointmentModalBody) {
  return (
    <>
      {doctor === null ? (
        "Error getting doctor Scheduele"
      ) : (
        <Box>
          <>
            <SimpleGrid
              columns={[1, 2, 2, 3]}
              spacing={"20px"}
              alignContent={"center"}
              verticalAlign={"center"}
              maxHeight={"500px"}
              overflow="scroll-y"
              my={"6"}
            >
              {doctor?.doctorschedule?.map((schedule: ISchedule) => (
                <Box
                  key={schedule.scheduleid}
                  backgroundColor={"teal.500"}
                  color={"white"}
                  px={"6"}
                  py={"4"}
                  onClick={onClick}
                >
                  <Stack spacing={"5px"}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>
                      {schedule.day[0].toUpperCase() + schedule.day.slice(1)}
                    </Text>
                    <Text textAlign={"left"}>{schedule.location}</Text>
                    <Text textAlign={"left"}>
                      Timings : {`${schedule.from} - ${schedule.till}`}
                    </Text>
                    <Text textAlign={"left"} _hover={{ cursor: "pointer" }}>
                      <Link
                        href={`https://maps.google.com/?q=${schedule.latitude},${schedule.longitude}`}
                        target="_blank"
                      >
                        <Text
                          color="white"
                          fontSize="sm"
                          fontWeight={"light"}
                          textDecoration="underline"
                        >
                          See this location on google maps
                        </Text>
                      </Link>
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </>
        </Box>
      )}
    </>
  );
}
