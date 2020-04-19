import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './views/Home';
import Users from './views/Users';
import UserCreate from './views/UserCreate';
import UserUpdate from './views/UserUpdate';
import EventoCreate from './views/eventos/EventoCreate';
import Clientes from './views/clientes/Clientes';
import ClienteCreate from './views/clientes/ClienteCreate';
import ClienteUpdate from './views/clientes/ClienteUpdate';

function Logout(){
    sessionStorage.removeItem('blogToken');
    return <Redirect to="/login" />
}

function Routes(){
    return (
        <>
            <Route exact path="/" component={ Home } />
            <Route exact path="/users" component={ Users } />
            <Route exact path="/users/create" component={ UserCreate } />
            <Route exact path="/users/update/:id" component={ UserUpdate } />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/eventos/create" component={ EventoCreate } />
            <Route exact path="/clientes" component={ Clientes } />
            <Route exact path="/clientes/create" component={ ClienteCreate } />
            <Route exact path="/clientes/update/:id" component={ ClienteUpdate } />
        </>
    );
}

export default Routes;