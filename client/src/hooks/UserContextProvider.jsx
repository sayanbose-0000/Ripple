import { useState } from "react"
import UserAuthContext from "./UserAuthContext";

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserAuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserContextProvider;