import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PatientMain from "../../components/PatientMain";
import PatientNav from "../../components/PatientNav";
import {
  fetchUserDetails,
  selectUserState,
  setAuthState,
} from "../../features/auth";

export default function Home() {
  const user = useSelector(selectUserState);
  console.log(user);
  const authState = useSelector(selectUserState);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!authState && localStorage.getItem("token") === null) {
      router.push("/login");
    }
    if (!authState && localStorage.getItem("token") !== null) {
      dispatch(setAuthState(true));
    }
    if (authState && localStorage.getItem("token") !== null) {
      dispatch(fetchUserDetails(localStorage.getItem("token")));
    }
    return () => {};
  }, []);
  const [search, setSearch] = useState<string>("");
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickSearch = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor/search?name=${name}`
    );
    const data = await res.json();
    setDoctorList(data);
  };
  return (
    <>
      <PatientNav />
      <PatientMain />
    </>
  );
}
