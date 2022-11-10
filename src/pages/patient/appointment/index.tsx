//Appointment page for patient
// path: src\pages\patient\appointment\index.tsx

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PatientNav from "../../../components/PatientNav";

export default function Appointment() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/appointments/getappointments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log("DATA");
      console.log(data);
    } catch (err) {
      toast({
        position: "top",
        title: "Error",
        description:
          "Something went wrong, Please check your internet connection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  return <>
  <PatientNav />

  </>;
}
