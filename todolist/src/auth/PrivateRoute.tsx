import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "../Login";
import GetToDoListClass from "../GetToDoList";
import { AuthConsumer } from "./AuthProvider";


interface PrivateRouteProps {
    component: any
    path: any,
}

const PrivateRoute = ({component, ...path}: PrivateRouteProps) => {
  return (
    <AuthConsumer>
        {({ isAuthenticated }) => {
            if (isAuthenticated()) {
                return <GetToDoListClass/>;
              
            } else {
              
                return <LoginPage />;
            }
        }}
       </AuthConsumer>
);
};
export default PrivateRoute;