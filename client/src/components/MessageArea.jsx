import { useEffect } from "react";

const MessageArea = ({ showContactAreaRef }) => {

  const hideSideBarOnClickOutside = (e) => {
    const firstImgListener = document.querySelector(".expand");
    if (!firstImgListener.contains(e.target)) {
      showContactAreaRef.current.className = "contactarea hidecontactarea";
    }
  }

  useEffect(() => {
    const messageAreaListener = document.querySelector(".messagearea")
    messageAreaListener.addEventListener("click", hideSideBarOnClickOutside);

    return () => {
      messageAreaListener.removeEventListener("click", hideSideBarOnClickOutside);
    };
  }, [])

  return (
    < div className="messagearea" >
      <div className="info">
        <img src="expand.svg" alt="expand" className="expand" onClick={() => showContactAreaRef.current.className = "contactarea showcontactarea"} />
        <img src="user.svg" alt="dp" />
        <div className="details">
          <p className="name">John Abraham</p>
          <p className="email">johnabraham0000@gmail.com</p>
        </div>
      </div>
    </div >
  );
};

export default MessageArea;