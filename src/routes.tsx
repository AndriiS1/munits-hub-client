import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login/login";
import ProtectedWrap from "./Components/ProtectedWrap/protectedWrap.component";
import SignUp from "./Components/SignUp/signUp.page";
import AddBucketPage from "./Pages/AddBucket/addBucket.page";
import Auth from "./Pages/Auth/auth.page";
import Bucket from "./Pages/Bucket/bucket.page";
import Buckets from "./Pages/Buckets/buckets.page";
import Home from "./Pages/Home/home.page";
import LandingPage from "./Pages/Landing/landing.page";
import { Metrics } from "./Pages/Metrics/metrics.page";
import ObjectPage from "./Pages/Object/object.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
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
        path: "metrics",
        element: (
          <ProtectedWrap>
            <Metrics />
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
      {
        path: "buckets/:bucketName/objects/:objectId",
        element: (
          <ProtectedWrap>
            <ObjectPage />
          </ProtectedWrap>
        ),
      },
    ],
  },
]);
