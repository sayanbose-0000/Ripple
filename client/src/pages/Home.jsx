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
  const showContactAreaRef = useRef("contactarea hidecontactarea");
  const [currentPerson, setCurrentPerson] = useState({});

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

  if (redirect) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="home">
      <ContactArea showContactAreaRef={showContactAreaRef} setCurrentPerson={setCurrentPerson} currentPerson={currentPerson} />
      <MessageArea showContactAreaRef={showContactAreaRef} currentPerson={currentPerson} />
    </div>
  );
};

export default Home;