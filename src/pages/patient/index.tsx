import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/Footer";
import AppointmentModal from "../../components/Modal";
import PatientMain from "../../components/PatientMain";
import PatientNav from "../../components/PatientNav";
import {
  fetchUserDetails,
  selectUserState,
  setAuthState,
} from "../../features/auth";
import { setDoctors } from "../../features/doctors";
export interface ISchedule {
  availabledate: any;
  scheduleid: number;
  location: string;
  latitude: string;
  longitude: string;
  day: string;
  from: string;
  till: string;
}

export interface IDoctor {
  userId?: number;
  name?: string;
  phone?: string;
  sessionfee?: number;
  qualifications?: [string];
  rating?: number;
  specializedtreatments?: [string];
  photo?: string;
  doctorschedule?: Array<ISchedule>;
}

export default function Home() {
  const user = useSelector(selectUserState);
  console.log(user);
  const authState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const router = useRouter();
  const [doctorList, setDoctorList] = useState<Array<IDoctor>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });
  const [name, setName] = useState<string>("");
  const toast = useToast();
  const dispath = useDispatch();

  const fetchDoctors = async (url: string) => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDoctorList((prev) => [...data.data]);
      dispatch(setDoctors(data.data));
    } catch (err) {
      toast({
        position: "top",
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!authState && localStorage.getItem("token") === null) {
      router.push("/login");
    }
    if (localStorage.getItem("token") !== null) {
      dispatch(setAuthState(true));
    }
    if (localStorage.getItem("token") !== null) {
      dispatch(fetchUserDetails(localStorage.getItem("token")));
    }

    fetchDoctors(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/doctors/getalldoc`
    );
  }, []);
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onChangeSearch");
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  const getNearestDoctors = async (e) => {
    e.preventDefault();
    console.log("getNearestDoctors");
    console.log(location);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/doctors/findnearestdoc?lat=${location.latitude}&lon=${location.longitude}&distance=1000`
      );
      const data = await response.json();
      console.log("Get Nearest Doctor", data);
      if (data.status === "success") {
        setDoctorList((prev) => [...data.data]);
        dispatch(setDoctors(data.data));
      } else {
        toast({
          position: "top",
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {}
  };
  const onClickSearch = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/doctors/search?name=${search}`
      );
      const data = await res.json();
      console.log(data);
      setDoctorList(data.data);
    } catch (err) {
      console.log(err);
      toast({
        position: "top",
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PatientNav />
      <PatientMain
        doctorList={doctorList}
        isLoading={loading}
        onClickSearch={onClickSearch}
        onChangeSearch={onChangeSearch}
        getNearestDoctors={getNearestDoctors}
      />
      <Footer />
    </>
  );
}
