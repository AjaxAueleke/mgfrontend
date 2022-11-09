import { NextPage } from "next";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { IDoctor, ISchedule } from "../../..";
import doctors from "../../../../../features/doctors";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

const CheckoutForm = ({
  doctor,
  scheduele,
}: {
  doctor: IDoctor;
  scheduele: ISchedule;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, token } = await stripe!.createToken(
      elements.getElement(CardElement)!
    );

    console.log();
    if (error) {
      toast({
        position: "top",
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/appointment/bookappointment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              docid: doctor.userId,
              scheduleid: scheduele.scheduleid,
              apptdate: scheduele.day,
            }),
          }
        );

        const data = await res.json();
        console.log(data);
        const res2 = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/bookings/addnewbooking`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              doctorid: doctor.userId,
              appointmentid: data.data.appointmentid,
              tokenid: token,
            }),
          }
        );
      } catch (err) {}
    }
  };
  return (
    <Box
      margin={"auto"}
      maxW={"container.md"}
      padding="2rem"
      minHeight={"100vh"}
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box width={"100%"}>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Heading>
              {doctor.name} - {scheduele.day}
            </Heading>
          </Stack>
          <CardElement />
          <Button
            width={"100%"}
            bgColor={"teal.500"}
            mt={4}
            px={"5"}
            border="1px solid teal"
            color={"white"}
            _hover={{
              bg: "white",
              color: "teal.500",
            }}
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default function AppointmentConfirm({ doctor, scheduleid }: any) {
  const scheduele = doctor.doctorschedule.find(
    (item: ISchedule) => item.scheduleid === scheduleid
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm scheduele={scheduele} doctor={doctor} />
    </Elements>
  );
}

export async function getServerSideProps(context: any) {
  const { schedueleid, doctorId } = context.params;
  console.log(context.params);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/doctors/${doctorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return {
      props: {
        doctor: data.data,
        schedueleid,
      },
    };
  } catch (err) {
    return {
      props: {
        doctor: {},
        schedueleid,
      },
      //   notFound : true,
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}
