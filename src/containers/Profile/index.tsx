import React from "react";
//Router
import { Link } from "react-router-dom";
//Auth
import { useAuth0 } from "../Auth/AuthServices";

const Profile: React.FC = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile</p>
      <Link to="/">Back Home</Link>

      <div>
        <ul>
          <li>
            <b>nickname: </b>
            {user.nickname}
          </li>
          <li>
            <b>picture: </b>
            <img width="50" src={user.picture} alt="User profile"/>
          </li>
          <li>
            <b>email: </b>
            {user.email}
          </li>
          <li>
            <b>email_verified: </b>
            {user.email_verified ? "yes" : "no"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
