import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route
            {...rest}
            element={user ? children : <Navigate to={ROUTES.LOGIN} replace />} 
        />
    );
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
};
