const Contact = ({ username, email, dp }) => {
  return (
    <div className="contact">
      <img src={dp} alt="person" />
      <div className="info">
        <p className="name">{username}</p>
        <p className="email">{email}</p>
      </div>
    </div>
  );
};

export default Contact;