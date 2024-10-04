const Contact = ({ username, email, dp, setCurrentPerson, showContactAreaRef }) => {

  const handleContactClick = (e) => {
    setCurrentPerson({ dp, email, username });
    showContactAreaRef.current.className = "contactarea hidecontactarea";
  }

  return (
    <div className="contact" onClick={e => handleContactClick(e)}>
      <img src={dp} alt="person" />
      <div className="info">
        <p className="name">{username}</p>
        <p className="email">{email}</p>
      </div>
    </div>
  );
};

export default Contact;