import React from "react";
//Pages Navigation
import Routes from "../../routes";
//Auth
import { useAuth0 } from "../Auth/AuthServices";

const App: React.FC = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>A carregar...</div>;
  }

  return (
    <div>
      <div>
        <div>Navs</div>
      </div>
      <div>
        <Routes />
      </div>
    </div>
  );
};

export default App;
