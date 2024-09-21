import "../styles/register.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
  const passRef = useRef(null);
  const [passVisibleIcon, setPassVisibleIcon] = useState("eye-close.svg");

  const handleTooglePassVisibility = (e) => {
    if (passRef.current.type === "password") {
      passRef.current.type = "text";
      setPassVisibleIcon("eye-open.svg");
    }
    else {
      passRef.current.type = "password";
      setPassVisibleIcon("eye-close.svg");
    }
  }

  return (
    <main className="register_main">
      <form className="register">
        <h1>Login</h1>
        <input type="email" name="email" id="email" placeholder="Enter email" required autoFocus autoComplete="email" />
        <div className="password_div">
          <input type="password" name="password" id="password" placeholder="Enter password" required autoComplete="new-password" ref={passRef} />
          <img src={passVisibleIcon} alt="" onClick={e => handleTooglePassVisibility(e)} />
        </div>
        <button type="submit">Login</button>
        <p className="already_done">Not registered? <Link className="Link" to={"/signup"}>Signup</Link></p>
      </form>
    </main>
  );
};

export default Login;