import { Link } from "react-router-dom";
import "./landing.style.css";

export default function LandingPage() {
  return (
    <div className="page">
      <main className="main">
        <div className="welcomeWrap">
          <div className="welcomeContent">
            MunitS is completely free and open source. Explore below for more
            details.
            <span className="logoText">MunitS</span>
            <span className="subLogoText">Secure. Scalable. Yours.</span>
            <div className="optionsWrap">
              <Link to="/login" className="welcomeOption">
                <div className="optionTitle">Start Now</div>
                <span>
                  Free access to MunitS Hub.
                  <br />
                  Experience hosted storage.
                </span>
              </Link>
              <a
                href="https://github.com/AndriiS1/MunitS"
                className="welcomeOption"
              >
                <div className="optionTitle">Explore Open Source</div>
                <span>
                  Full access to code.
                  <br />
                  Make it work for you.
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="comparisonTableWrap">
          <div className="tableTitle">MunitS Capabilities</div>
          <hr />
        </div>
      </main>
      <hr />
      <footer className="footer">
        <div className="footerText">
          <h3>MunitS</h3>
          <div>© 2025 MunitS. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
