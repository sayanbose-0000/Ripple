import { useEffect } from "react";
import Message from "./Message";

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
    <div className="messagearea" >
      <div className="info">
        <img src="expand.svg" alt="expand" className="expand" onClick={() => showContactAreaRef.current.className = "contactarea showcontactarea"} />
        <img src="user.svg" alt="dp" />
        <div className="details">
          <p className="name">John Abraham</p>
          <p className="email">johnabraham0000@gmail.com</p>
        </div>
      </div>

      <div className="message-container">
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="them" />
        <Message propClass="me" />
        <Message propClass="me" />
        <Message propClass="me" />
      </div>

      <form className="send_message_container">
        <input type="" name="messageinput" id="messageinput" className="messageinput" />
        {/* <textarea name="messageinput" id="messageinput" className="messageinput"></textarea> */}
        <button type="submit" className="sendmessage"><img src="send.svg" alt="Send" /></button>
      </form>
    </div>
  );
};

export default MessageArea;