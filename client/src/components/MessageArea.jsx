import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { socket } from "../configs/config";
import UserAuthContext from "../hooks/UserAuthContext";

const MessageArea = ({ showContactAreaRef, currentPerson }) => {
  const { userInfo, setUserInfo } = useContext(UserAuthContext);
  const [room, setRoom] = useState("");
  const [messageValue, setMessageValue] = useState(""); // what is typed in text box
  const [messages, setMessages] = useState([]); // the actual messages showed above in message-container
  const focusRef = useRef(null);

  const hideSideBarOnClickOutside = (e) => {
    const firstImgListener = document.querySelector(".expand");
    if (!firstImgListener.contains(e.target)) {
      showContactAreaRef.current.className = "contactarea hidecontactarea";
    }
  }

  useEffect(() => {
    const email1 = userInfo.email;
    const email2 = currentPerson.email;

    const emails = [email1, email2].sort();

    if (email1 && email2) {
      const room = encodeURIComponent(emails[0]) + encodeURIComponent(emails[1]);

      socket.emit("join-room", room);
      setRoom(room);
    }
  }, [currentPerson])

  useEffect(() => {
    const messageAreaListener = document.querySelector(".messagearea");
    messageAreaListener.addEventListener("click", hideSideBarOnClickOutside);

    return () => {
      messageAreaListener.removeEventListener("click", hideSideBarOnClickOutside);
    };
  }, [])

  useEffect(() => {
    if (room) {
      socket.on("message", (msg) => {
        setMessages(messages => [...messages, msg]);
      });
    }
  }, [room])

  useEffect(() => {
    focusRef.current.scrollTop = focusRef.current.scrollHeight;
  }, [messages]);

  const handleMessageSend = (e) => {
    e.preventDefault();

    if (messageValue != "") {
      socket.emit("message", room, { sender: userInfo.email, messageValue: messageValue });
    }

    focusRef.current.focus();
    setMessageValue("");
  }

  return (
    <div className="messagearea">
      <div className="info">
        <img src="expand.svg" alt="expand" className="expand" onClick={() => showContactAreaRef.current.className = "contactarea showcontactarea"} />
        {Object.keys(currentPerson).length > 0 && <img src={currentPerson.dp} alt="dp" />}
        {
          Object.keys(currentPerson).length > 0 &&
          <div className="details">
            <p className="name">{currentPerson.username}</p>
            <p className="email">{currentPerson.email}</p>
          </div>
        }
      </div>

      <div className="message-container" ref={focusRef}>
        {
          Object.keys(currentPerson).length > 0 ?
            messages.map((item, index) => {
              return <Message propClass={item.sender == userInfo.email ? "me" : "them"} messageText={item.messageValue} key={index} />
            })
            :
            <p className="no_messages">Please Select a Contact</p>
        }
      </div>

      <form className="send_message_container" onSubmit={e => handleMessageSend(e)} autoComplete="off">
        <input type="text" name="messageinput" id="messageinput" disabled={!Object.keys(currentPerson).length > 0} className="messageinput" placeholder="Enter message..." value={messageValue} onChange={(e) => { setMessageValue(e.target.value) }} autoFocus></input>
        <button type="submit" className="sendmessage" disabled={!Object.keys(currentPerson).length > 0}><img src="send.svg" alt="Send" /></button>
      </form>
    </div>
  );
};

export default MessageArea;