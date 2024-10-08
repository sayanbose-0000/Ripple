import Contact from "./Contact";
import { BACK_URL } from "../configs/config";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserAuthContext from "../hooks/UserAuthContext";

const ContactArea = ({ showContactAreaRef, setCurrentPerson, currentPerson }) => {
  const [searchEmailUsername, setSearchEmailUsername] = useState("");
  const [contactResponse, setContactResponse] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserAuthContext);
  const [redirect, setRedirect] = useState(false);

  // const handleSearch = async (e) => {
  //   const response = await fetch(`${BACK_URL}/auth/search/?emailorusername=${searchEmailUsername}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" }
  //   })

  //   const result = await response.json();

  //   setContactsResponse(result.message);
  // }

  useEffect(() => {
    if (searchEmailUsername != "") {
      (async () => {
        const response = await fetch(`${BACK_URL}/auth/search/?emailorusername=${searchEmailUsername}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        const result = await response.json();

        setContactResponse(result.message);
      })();
    }

    else {
      const getOldContacts = JSON.parse(localStorage.getItem("saved-contact"));
      setContactResponse(getOldContacts || []);
    }
  }, [searchEmailUsername]);

  const handleLogout = async (e) => {
    e.preventDefault();

    const result = await fetch(`${BACK_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    })

    if (result.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="contactarea hidecontactarea" ref={showContactAreaRef}>
      {/* <div className="search-box" onChange={e => handleSearch(e)}> */}
      <div className="search-box">
        <label htmlFor="search"><img src="search.svg" alt="Search" /></label>
        <input type="text" id="search" placeholder="Search" value={searchEmailUsername} onChange={e => setSearchEmailUsername(e.target.value)} />
        <img src="collapse.svg" alt="Collapse" className="collapse" onClick={() => showContactAreaRef.current.className = "contactarea hidecontactarea"} />
      </div>

      <div className="contact-container">
        {
          contactResponse.length > 0 ?
            contactResponse.map(item => (
              <Contact key={item.id} username={userInfo.username == item.username ? `${item.username} (me)` : item.username} id={item.id} email={item.email} dp={item.dp} currentPerson={currentPerson} setCurrentPerson={setCurrentPerson} showContactAreaRef={showContactAreaRef} />
            ))
            :
            <p className="no_contact">No contacts</p>
        }
        <div className="myprofile">
          <img src={userInfo.dp} alt="my-dp" className="my-dp" />
          <p>{userInfo.username}</p>
          <button onClick={e => handleLogout(e)}><img src="logout.svg" alt="logout" /></button>
        </div>
      </div>
    </div>
  );
};

export default ContactArea;