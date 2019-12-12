import React from "react";
import ReactDOM from "react-dom";
//Router
import { BrowserRouter as Router } from "react-router-dom";
//Containers
import Register from "./Register";
//Utilities
import * as serviceWorker from "./serviceWorker";

const AppRegister: React.FC = () => {
  return (
    <Router>
      <Register />
    </Router>
  );
};

ReactDOM.render(<AppRegister />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
