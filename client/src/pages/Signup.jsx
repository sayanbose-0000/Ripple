import { useContext, useRef, useState } from "react";
import "../styles/register.scss";
import { Link, Navigate } from "react-router-dom";
import { BACK_URL } from "../configs/config";
import { toast } from "react-hot-toast";
import UserAuthContext from "../hooks/UserAuthContext";

const Signup = () => {
  const passRef = useRef(null);
  const imgRef = useRef(null);
  const [passVisibleIcon, setPassVisibleIcon] = useState("eye-close.svg");
  const [dpImage, setDpImage] = useState("user.svg");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dp, setDp] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserAuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(); // used so that image can be send
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("dp", dp);

    const response = await fetch(`${BACK_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    const result = await response.json();
    response.ok ? toast.success(result.message) : toast.error(result.message);

    if (response.ok) {
      setRedirect(true);
    };

    setLoading(false);
  }

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

  const handleImagePick = (e) => {
    imgRef.current.click();
  }

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        setDpImage(fileReader.result);
        setDp(file);
      }
    }
  }

  if (redirect || Object.keys(userInfo) > 0) {
    return <Navigate to={"/"} />
  }

  return (
    <main className="register_main">
      <form className="register" onSubmit={e => handleSignup(e)}>
        <h1>Signup</h1>
        <div className="dp_container">
          <img className="dp" src={dpImage} alt="dp" onClick={e => handleImagePick(e)} />
          <input type="file" name="input_dp" id="input_dp" className="input_dp" ref={imgRef} onChange={e => handleOnChange(e)} />
        </div>
        <input type="email" name="email" id="email" placeholder="Enter email" autoFocus autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" name="username" id="username" placeholder="Enter username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
        <div className="password_div">
          <input type="password" name="password" id="password" placeholder="Enter password" autoComplete="new-password" ref={passRef} value={password} onChange={e => setPassword(e.target.value)} />
          <img src={passVisibleIcon} alt="" onClick={e => handleTooglePassVisibility(e)} />
        </div>
        {loading ? <button type="submit"><img src="loading.svg" alt="loading" /></button> : <button type="submit">Signup</button>}
        <p className="already_done">Already registered? <Link className="Link" to={"/login"}>Login</Link></p>
      </form>
    </main>

  );
};

export default Signup;