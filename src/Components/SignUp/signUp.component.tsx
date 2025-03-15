import { Button, Snackbar, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import TokenService from "../../Services/token.service";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [axiosErrorMessage, setAxiosErrorMessage] = useState<any>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const userRegisterDataIsValid = !emailError && !passwordError;

  const emailRegexPatter = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  const passwordRegexPatter = new RegExp(
    "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
  );

  useEffect(() => {
    const validateField = (
      field: string,
      regexPattern: RegExp,
      setError: (error: boolean) => void
    ) => {
      field && setError(!regexPattern.test(field));
    };

    validateField(email, emailRegexPatter, setEmailError);
    validateField(password, passwordRegexPatter, setPasswordError);
  }, [email, password]);

  const HandleSignUpSubmit = async () => {
    try {
      if (userRegisterDataIsValid) {
        await AuthService.signUp({
          email,
          password,
        });
      }
      if (TokenService.getUserTokens()) {
        navigate("/home");
      }
    } catch (e) {
      const error = e as AxiosError;
      setAxiosErrorMessage(error?.response?.data || error?.message);
      console.log(error);
      setOpen(true);
    }
  };

  return (
    <div className="form-wrap">
      <Form className="form-container" onSubmit={() => HandleSignUpSubmit()}>
        <span className="form-title">Sign up</span>
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
        <Link className="register-link form-element" to={"/login"}>
          Log in
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
