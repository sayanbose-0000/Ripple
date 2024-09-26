import { useState } from "react"
import UserAuthContext from "./UserAuthContext";

const UserAuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserAuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthContextProvider;