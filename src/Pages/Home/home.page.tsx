import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import authServiceInstance from "../../Services/auth.service";
import "./home.style.css";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string>("admin@gmail.com");

  useEffect(() => {
    const getUserEmail = async () => {
      setUserEmail(await authServiceInstance.getUserEmail());
    };

    getUserEmail();
  }, []);

  return (
    <div>
      <header>
        <ul className="nav">
          <li className="logo-text">MunitS</li>
          <li>Log out</li>
        </ul>
      </header>

      <div className="home-container">
        <div className="side-bar">
          <div className="user-email">{userEmail}</div>
          <ul>
            <li className="">Dashboard</li>
            <li className="">Analytics</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
        <footer className="home-footer"></footer>
      </div>
    </div>
  );
}
