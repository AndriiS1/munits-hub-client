import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenService from "../../Services/token.service";

export default function ProtectedWrap(props: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = async () => {
      if (!TokenService.isUserLogged()) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkUserLogin();
  }, [navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  return <>{props.children}</>;
}
