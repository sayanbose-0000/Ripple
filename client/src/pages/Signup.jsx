import { useRef, useState } from "react";
import "../styles/register.scss";
import { Link } from "react-router-dom"

const Signup = () => {

  const passRef = useRef(null);
  const [passVisibleIcon, setPassVisibleIcon] = useState("eye-close.svg");

  const handleTooglePassVisibility = (e) => {
    if (passRef.current.type === "password") {
      passRef.current.type = "text"
      setPassVisibleIcon("eye-open.svg");
    }
    else {
      passRef.current.type = "password"
      setPassVisibleIcon("eye-close.svg");
    }
  }

  return (
    <main className="register_main">
      <form className="register">
        <h1>Signup</h1>
        <input type="text" name="email" id="email" placeholder="Enter email" required autoFocus autoComplete="email" />
        <input type="text" name="username" id="username" placeholder="Enter username" required autoComplete="username" />
        <div className="password_div">
          <input type="password" name="password" id="password" placeholder="Enter password" required autoComplete="new-password" ref={passRef} />
          <img src={passVisibleIcon} alt="" onClick={e => handleTooglePassVisibility(e)} />
        </div>
        <button type="submit">Signup</button>
        <p className="already_done">Already registered? <Link className="link" to={"/login"}>Login</Link></p>
      </form>
    </main>

  );
};

export default Signup;