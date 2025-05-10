import { Outlet, useNavigate } from "react-router-dom";
import "./auth.style.css";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrap">
      <header>
        <ul className="nav">
          <ul className="logo-text" onClick={() => navigate("")}>
            MunitS
          </ul>
        </ul>
      </header>

      <div className="form-wrap">
        <Outlet />
      </div>
    </div>
  );
}
