import type { LocalizationLang } from "@/Localization/localization.service";
import localizationService from "@/Localization/localization.service";
import { Outlet, useNavigate } from "react-router-dom";
import "./auth.style.css";

export default function Auth() {
  const navigate = useNavigate();

  const handleLanguageChange = (language: LocalizationLang) => {
    localizationService.setUserTokens(language);
    window.location.reload();
  };

  return (
    <div className="auth-wrap">
      <header>
        <ul className="nav">
          <ul className="logo-text" onClick={() => navigate("")}>
            MunitS
          </ul>
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
          </ul>
        </ul>
      </header>

      <div className="form-wrap">
        <Outlet />
      </div>
    </div>
  );
}
