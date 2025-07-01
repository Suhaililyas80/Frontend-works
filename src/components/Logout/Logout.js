import React, { useEffect } from "react";
import { logout } from "../../api";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    logout()
      .catch((error) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        window.sessionStorage.clear();
        history.push("/login");
      });
  }, [history]);

  return (
    <div className="logout-container">
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
