import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";

import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import UserService from "../services/user.services";

import EventsShow from "./examples/EventsShow";

import AddVoteSubject from "./examples/AddVoteSubject";
import ShowSubject from "./examples/ShowSubject";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        UserService.isAuthenticated() ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer />
            </main>
          </>
        ) : (
          <Redirect to={{ pathname: "/sign-in" }} />
        )
      }
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />

    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={EventsShow}
    />

    <RouteWithSidebar
      exact
      path={Routes.AddSubject.path}
      component={AddVoteSubject}
    />
    <RouteWithSidebar
      exact
      path={Routes.ShowSubject.path}
      component={ShowSubject}
    />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
