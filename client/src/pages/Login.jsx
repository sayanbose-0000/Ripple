import "../styles/register.scss";
import { Link, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import { BACK_URL } from "../configs/config";
import toast from "react-hot-toast";

const Login = () => {
  const passRef = useRef(null);
  const [passVisibleIcon, setPassVisibleIcon] = useState("eye-close.svg");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch(`${BACK_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        email,
        password
      })
    })

    const result = await response.json();
    response.ok ? toast.success(result.message) : toast.error(result.message);

    if (response.ok) {
      setRedirect(true);
    };

    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <main className="register_main">
      <form className="register" onSubmit={e => handleLogin(e)}>
        <h1>Login</h1>
        <input type="email" name="email" id="email" placeholder="Enter email" required autoFocus autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="password_div">
          <input type="password" name="password" id="password" placeholder="Enter password" required autoComplete="new-password" ref={passRef} value={password} onChange={e => setPassword(e.target.value)} />
          <img src={passVisibleIcon} alt="" onClick={e => handleTooglePassVisibility(e)} />
        </div>
        {loading ? <button type="submit"><img src="loading.svg" alt="loading" /></button> : <button type="submit">Login</button>}
        <p className="already_done">Not registered? <Link className="Link" to={"/signup"}>Signup</Link></p>
      </form>
    </main>
  );
};

export default Login;