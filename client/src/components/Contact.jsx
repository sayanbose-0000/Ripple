const Contact = ({ id, username, email, dp, setCurrentPerson, showContactAreaRef }) => {

  const handleContactClick = (e) => {
    setCurrentPerson({ dp, email, username });

    let savePersonArr = JSON.parse(localStorage.getItem("saved-contact")) || [];
    const personPresentBool = savePersonArr.find(item => item.id === id);

    if (!personPresentBool) {
      savePersonArr.push({ id, dp, email, username });
      localStorage.setItem("saved-contact", JSON.stringify(savePersonArr));
    }

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