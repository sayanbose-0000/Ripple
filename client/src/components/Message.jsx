const Message = ({ propClass, messageText }) => {
  return (
    <div className={`${propClass} message`}>
      <p>{messageText}</p>
    </div>
  );
};

export default Message;