import localizationService, {
  type LocalizationLang,
} from "@/Localization/localization.service";
import { Link } from "react-router-dom";
import "./landing.style.css";

export default function LandingPage() {
  const handleLanguageChange = (language: LocalizationLang) => {
    localizationService.setUserTokens(language);
    window.location.reload();
  };

  return (
    <div className="page">
      <header className="landing-header">
        <ul className="landing-nav">
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
          </ul>
        </ul>
      </header>
      <main className="main">
        <div className="welcomeWrap">
          <div className="welcomeContent">
            {localizationService.translate("welcome_message")}
            <span className="logoText">MunitS</span>
            <span className="subLogoText">
              {localizationService.translate("sub_logo_message")}
            </span>
            <div className="optionsWrap">
              <Link to="/login" className="welcomeOption">
                <div className="optionTitle">
                  {localizationService.translate("start_now")}
                </div>
                <span>
                  {localizationService.translate("free_access")}
                  <br />
                  {localizationService.translate("experience_storage")}
                </span>
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/AndriiS1/MunitS"
                className="welcomeOption"
              >
                <div className="optionTitle">
                  {localizationService.translate("explore_open_source")}
                </div>
                <span>
                  {localizationService.translate("full_access")}
                  <br />
                  {localizationService.translate("make_it_work")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <hr />
        <div className="content">
          <div className="footerText">
            <h3>MunitS</h3>
            <div>{localizationService.translate("all_rights_reserved")}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
