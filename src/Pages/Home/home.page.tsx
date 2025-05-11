import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authServiceInstance from "../../Services/auth.service";
import "./home.style.css";

export default function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("admin@gmail.com");

  useEffect(() => {
    const getUserEmail = async () => {
      setUserEmail(await authServiceInstance.getUserEmail());
    };

    getUserEmail();
  }, []);

  const handleLogout = () => {
    authServiceInstance.logout();
    navigate("/");
  };

  return (
    <div className="home-wrap">
      <header>
        <ul className="nav">
          <ul className="logo-text">MunitS</ul>
          <ul className="log-out" onClick={() => handleLogout()}>
            Log out
          </ul>
        </ul>
      </header>

      <div className="home-container">
        <div className="side-bar">
          <div className="user-email">{userEmail}</div>
          <ul>
            <ul>Dashboard</ul>
            <ul>Metrics</ul>
          </ul>
        </div>
        <div className="page-content-wrapper">
          <div className="page-content">
            <Outlet />
          </div>
        </div>
        <footer className="home-footer"></footer>
      </div>
    </div>
  );
}
