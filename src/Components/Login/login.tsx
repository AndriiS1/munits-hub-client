import { Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import TokenService from "../../Services/token.service";
import "./login.style.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [axiosErrorMessage, setAxiosErrorMessage] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const userLoginDataIsValid = !emailError && !passwordError;

  useEffect(() => {
    const emailRegexPatter = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    const passwordRegexPatter = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
    );

    const validateField = (
      field: string,
      regexPattern: RegExp,
      setError: (error: boolean) => void
    ) => {
      if (field) {
        setError(!regexPattern.test(field));
      }
    };

    validateField(email, emailRegexPatter, setEmailError);
    validateField(password, passwordRegexPatter, setPasswordError);
  }, [email, password]);

  const HandleLoginSubmit = async () => {
    try {
      if (userLoginDataIsValid) {
        await AuthService.login(email, password);
      }
      if (TokenService.getUserTokens()) {
        navigate("/buckets");
      }
    } catch (e) {
      const error = e as { response?: { data?: string }; message?: string };
      setAxiosErrorMessage(
        error?.response?.data || error?.message || "An error occurred"
      );
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <div>
      <Form className="form-container" onSubmit={() => HandleLoginSubmit()}>
        <span className="form-title">Login</span>
        <TextField
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@gmail.com"
          margin="dense"
          size="small"
          label="Email"
        />
        <TextField
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
          margin="dense"
          size="small"
          label="Password"
        />
        <Button className="form-element" type="submit">
          Submit
        </Button>
        <Link className="register-link form-element" to="/sign-up">
          Sign up
        </Link>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={4000}
          message={axiosErrorMessage}
        />
      </Form>
    </div>
  );
}
