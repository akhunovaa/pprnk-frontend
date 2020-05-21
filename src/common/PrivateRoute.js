import React from 'react';
import {Route, Redirect} from "react-router-dom";
import { checkLocalStorage } from "../util/APIUtils";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (checkLocalStorage() || authenticated) ? (
                <Component {...rest} {...props} authenticated />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute