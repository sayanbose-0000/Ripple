import { useContext, useEffect, useRef, useState } from "react";
import { BACK_URL } from "../configs/config";
import UserAuthContext from "../hooks/UserAuthContext";
import { Navigate, Outlet } from "react-router-dom";
import "../styles/home.scss";
import ContactArea from "../components/ContactArea";
import MessageArea from "../components/MessageArea";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserAuthContext);
  const [redirect, setRedirect] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  // const isMounted = useRef(false);

  useEffect(() => {
    const verifyUser = async () => {
      const response = await fetch(`${BACK_URL}/auth/profile`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        const result = await response.json();
        const userResult = result.message;

        setUserInfo(userResult);
      }

      else {
        setRedirect(true);
      }
    }

    verifyUser();
  }, []);

  // useEffect(() => {

  //   const resizeShow = () => {
  //     if (window.innerWidth < 768) {
  //       setShowSideBar(false);
  //     }
  //     else {
  //       setShowSideBar(true);
  //     }
  //   }

  //   window.addEventListener("resize", resizeShow);

  //   resizeShow();

  //   return () => {
  //     window.removeEventListener("resize", resizeShow);
  //   };
  // }, [])

  if (redirect) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="home">
      {showSideBar ? <ContactArea showSideBar={showSideBar} setShowSideBar={setShowSideBar} /> : null}
      <MessageArea showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </div>
  );
};

export default Home;