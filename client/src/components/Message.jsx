import { simpleCrypto } from "../configs/config";

const Message = ({ propClass, messageText, date, time }) => {
  return (
    <div className={`${propClass} message`}>
      <p>{simpleCrypto.decrypt(messageText)}</p>
      <div className="date_time">
        <span className="date">{date}</span>
        <span className="time">{time}</span>
      </div>
    </div>
  );
};

export default Message;