import { Link } from "react-router-dom";
import "../styles/errorpg.scss";

const ErrorPg = () => {
  return (
    <main className="errorpg">
      <h1 className="heading">Oops!</h1>
      <h2>404- Page Not Found</h2>
      <p>The page you are looking for might might have been removed, had its name changed or is temporarily unavailable</p>
      <Link className="Link">Go to Home</Link>
    </main>
  );
};

export default ErrorPg;
