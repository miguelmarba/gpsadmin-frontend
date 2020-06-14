import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import Home from './views/Home';
import Login from './views/Login';
import Users from './views/users/Users';
import UserCreate from './views/users/UserCreate';
import UserUpdate from './views/users/UserUpdate';
import EventoCreate from './views/eventos/EventoCreate';
import Clientes from './views/clientes/Clientes';
import ClienteCreate from './views/clientes/ClienteCreate';
import ClienteUpdate from './views/clientes/ClienteUpdate';
import LineasTransporte from './views/lineas_transporte/LineasTransporte';
import LineasTransporteCreate from './views/lineas_transporte/LineasTransporteCreate';
import LineasTransporteUpdate from './views/lineas_transporte/LineasTransporteUpdate';
import Operadores from './views/operadores/Operadores';
import OperadorCreate from './views/operadores/OperadorCreate';
import OperadorUpdate from './views/operadores/OperadorUpdate';
import Cajas from './views/cajas/Cajas';
import CajaCreate from './views/cajas/CajaCreate';
import CajaUpdate from './views/cajas/CajaUpdate';
import Camiones from './views/camiones/Camiones';
import CamionCreate from './views/camiones/CamionCreate';
import CamionUpdate from './views/camiones/CamionUpdate';
import StatusRuta from './views/status_ruta/StatusRuta';
import StatusRutaCreate from './views/status_ruta/StatusRutaCreate';
import StatusRutaUpdate from './views/status_ruta/StatusRutaUpdate';
import Ubicaciones from './views/ubicaciones/Ubicaciones';
import UbicacionCreate from './views/ubicaciones/UbicacionCreate';
import UbicacionUpdate from './views/ubicaciones/UbicacionUpdate';
import EquiposGps from './views/equipos_gps/EquiposGps';
import EquipoGpsCreate from './views/equipos_gps/EquipoGpsCreate';
import EquipoGpsUpdate from './views/equipos_gps/EquipoGpsUpdate';
import EventoUpdate from './views/eventos/EventoUpdate';
import Rutas from './views/eventos/Eventos';
import RutasDetail from './views/eventos/EventoDetail';
import Profile from './views/users/Profile';
import Settings from './views/users/Settings';

function Logout(){
    sessionStorage.removeItem('idToken');
    return <Redirect to="/login" />
}

function Routes(){
    return (
        <>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/users" component={ Users } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/users/create" component={ UserCreate } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/users/update/:id" component={ UserUpdate } />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/eventos/create" component={ EventoCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/clientes" component={ Clientes } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/clientes/create" component={ ClienteCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/clientes/update/:id" component={ ClienteUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/lineastrasporte" component={ LineasTransporte } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/lineastrasporte/create" component={ LineasTransporteCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/lineastrasporte/update/:id" component={ LineasTransporteUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/operadores" component={ Operadores } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/operadores/create" component={ OperadorCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/operadores/update/:id" component={ OperadorUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/cajas" component={ Cajas } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/cajas/create" component={ CajaCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/cajas/update/:id" component={ CajaUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/camiones" component={ Camiones } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/camiones/create" component={ CamionCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/camiones/update/:id" component={ CamionUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/statusruta" component={ StatusRuta } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/statusruta/create" component={ StatusRutaCreate } />
            <PrivateRoute roles={['ADMINISTRADOR']} exact path="/statusruta/update/:id" component={ StatusRutaUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/ubicaciones" component={ Ubicaciones } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/ubicaciones/create" component={ UbicacionCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/ubicaciones/update/:id" component={ UbicacionUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/equiposgps" component={ EquiposGps } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/equiposgps/create" component={ EquipoGpsCreate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/equiposgps/update/:id" component={ EquipoGpsUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/eventos/update/:id" component={ EventoUpdate } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/eventos" component={ Rutas } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/eventos/detail/:id" component={ RutasDetail } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/profile" component={ Profile } />
            <PrivateRoute roles={['ADMINISTRADOR', 'MONITORISTA', 'CUSTODIO']} exact path="/settings" component={ Settings } />
        </>
    );
}

export default Routes;