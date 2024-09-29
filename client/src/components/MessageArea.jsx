const MessageArea = ({ showSideBar, setShowSideBar }) => {
  return (
    <div className="messagearea">
      <div className="info">
        {/* {!showSideBar ? < img src="expand.svg" alt="expand" className="expand" onClick={() => { setShowSideBar(true) }} /> : null} */}
        < img src="expand.svg" alt="expand" className="expand" onClick={() => { setShowSideBar(true) }}/>
        <img src="person.jpg" alt="dp" />
        <div className="details">
          <p className="name">John Abraham</p>
          <p className="email">johnabraham0000@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;