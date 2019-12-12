import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../Auth/AuthServices";

function App() {
  const { logout } = useAuth0();

  return (
    <div>
      Welcome
      <p>
        <Link to="/profile">Profile</Link>
        <br />
        <Link to="/">Home</Link>
      </p>
      <button
        id="qsLoginBtn"
        color="primary"
        className="btn-margin"
        onClick={() =>
          logout({
            returnTo: window.location.origin
          })
        }
      >
        Log out
      </button>
    </div>
  );
}

export default App;
