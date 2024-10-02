import Contact from "./Contact";
import { BACK_URL } from "../configs/config";
import { useEffect, useState } from "react";

const ContactArea = ({ showContactAreaRef }) => {
  const [searchEmailUsername, setSearchEmailUsername] = useState("");
  const [contactResponse, setContactsResponse] = useState([]);

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

        setContactsResponse(result.message);
      })();
    }

    else {
      setContactsResponse([]);
    }
  }, [searchEmailUsername]);

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
          contactResponse.map(item => (
            <Contact key={item.id} username={item.username} email={item.email} dp={item.dp} />
          ))
        }
      </div>
    </div>
  );
};

export default ContactArea;