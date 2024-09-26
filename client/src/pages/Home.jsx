import { useContext, useEffect, useRef, useState } from "react";
import { BACK_URL } from "../configs/config";
import UserAuthContext from "../hooks/UserAuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserAuthContext);
  const [redirect, setRedirect] = useState(false);
  const isMounted = useRef(false);

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

  useEffect(() => {
    if (isMounted.current && Object.keys(userInfo).length > 0) {
      // code
    }

    else {
      isMounted.current = true;
    }
  }, [userInfo]);

  if (redirect) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <p>Home</p>
    </>
  );
};

export default Home;