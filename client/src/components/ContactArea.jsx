import Contact from "./Contact";

const ContactArea = ({ showSideBar, setShowSideBar }) => {
  return (
    <div className="contactarea">
      <div className="search-box">
        <label htmlFor="search"><img src="search.svg" alt="Search" /></label>
        <input type="text" id="search" placeholder="Search" />
        <img src="collapse.svg" alt="Collapse" className="collapse" onClick={() => setShowSideBar(false)} />
      </div>
      <div className="contact-container">
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export default ContactArea;