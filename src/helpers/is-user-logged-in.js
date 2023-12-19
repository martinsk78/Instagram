import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function IsUserLoggedIn({ user, loggedInPath, children, ...rest }) {
    return (
        <Route
            {...rest}
            element={!user ? children : <Navigate to={loggedInPath} replace />} 
        />
    );
}

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    loggedInPath: PropTypes.string,
    children: PropTypes.object.isRequired,
};
