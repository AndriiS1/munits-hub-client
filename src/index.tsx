import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedWrap from "./Components/ProtectedWrap/protectedWrap.component";
import AddBucketPage from "./Pages/AddBucket/addBucket.page";
import Bucket from "./Pages/Bucket/bucket.page";
import Buckets from "./Pages/Buckets/buckets.page";
import Home from "./Pages/Home/home.page";
import LandingPage from "./Pages/Landing/landing.page";
import Login from "./Pages/Login/login.page";
import SignUp from "./Pages/SignUp/signUp.page";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedWrap>
        <Home />
      </ProtectedWrap>
    ),
    children: [
      {
        path: "buckets",
        element: (
          <ProtectedWrap>
            <Buckets />
          </ProtectedWrap>
        ),
      },
      {
        path: "buckets/new",
        element: (
          <ProtectedWrap>
            <AddBucketPage />
          </ProtectedWrap>
        ),
      },
      {
        path: "buckets/:bucketName",
        element: (
          <ProtectedWrap>
            <Bucket />
          </ProtectedWrap>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
