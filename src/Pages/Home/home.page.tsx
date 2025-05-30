import MetricsIcon from "@/Assets/metrics.icon";
import localizationService, {
  type LocalizationLang,
} from "@/Localization/localization.service";
import { DatabaseIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authServiceInstance from "../../Services/auth.service";
import "./home.style.css";

type OptionType = "dashboard" | "metrics";

export default function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("admin@gmail.com");

  const firstSegment = location.pathname.split("/").filter(Boolean)[0];

  const isValidOption = (value: string): value is OptionType => {
    return value === "dashboard" || value === "metrics";
  };

  const [option, setOptions] = useState<OptionType>(
    isValidOption(firstSegment) ? firstSegment : "dashboard"
  );

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

  const handleLanguageChange = (language: LocalizationLang) => {
    localizationService.setUserTokens(language);
    window.location.reload();
  };

  return (
    <div className="home-wrap">
      <header>
        <ul className="nav">
          <ul className="logo-text">MunitS</ul>
          <ul className="right-side-options">
            <div className="localization">
              <ul
                className="language-option"
                onClick={() => handleLanguageChange("UA")}
              >
                UA
              </ul>
              |
              <ul
                className="language-option"
                onClick={() => handleLanguageChange("EN")}
              >
                EN
              </ul>
            </div>
            <div className="log-out" onClick={() => handleLogout()}>
              {localizationService.translate("log_out")}
            </div>
          </ul>
        </ul>
      </header>

      <div className="home-container">
        <div className="side-bar">
          <div className="user-email">{userEmail}</div>
          <ul>
            <ul
              className={`option ${option === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setOptions("dashboard");
                navigate("/buckets");
              }}
            >
              <DatabaseIcon className="option-icon" />
              <span> {localizationService.translate("dashboard")}</span>
            </ul>
            <ul
              className={`option ${option === "metrics" ? "active" : ""}`}
              onClick={() => {
                setOptions("metrics");
                navigate("/metrics");
              }}
            >
              <MetricsIcon className="option-icon" />
              <span>{localizationService.translate("metrics")}</span>
            </ul>
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
