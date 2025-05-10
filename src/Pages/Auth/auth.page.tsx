import { Outlet, useNavigate } from "react-router-dom";
import "./auth.style.css";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrap">
      <header>
        <ul className="nav">
          <li className="logo-text" onClick={() => navigate("")}>
            MunitS
          </li>
        </ul>
      </header>

      <div className="form-wrap">
        <Outlet />
      </div>
    </div>
  );
}
