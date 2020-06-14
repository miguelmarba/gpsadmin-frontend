import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authenticate from './authenticate';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const { isAuthenticated, payload } = authenticate();
        if(!isAuthenticated){
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (roles && roles.indexOf(payload.rol) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        return <Component {...props} />
    }} />
);

export default PrivateRoute;