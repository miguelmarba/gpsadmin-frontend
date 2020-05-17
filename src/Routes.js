import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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

function Logout(){
    sessionStorage.removeItem('idToken');
    return <Redirect to="/login" />
}

function Routes(){
    return (
        <>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/users" component={ Users } />
            <Route exact path="/users/create" component={ UserCreate } />
            <Route exact path="/users/update/:id" component={ UserUpdate } />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/eventos/create" component={ EventoCreate } />
            <Route exact path="/clientes" component={ Clientes } />
            <Route exact path="/clientes/create" component={ ClienteCreate } />
            <Route exact path="/clientes/update/:id" component={ ClienteUpdate } />
            <Route exact path="/lineastrasporte" component={ LineasTransporte } />
            <Route exact path="/lineastrasporte/create" component={ LineasTransporteCreate } />
            <Route exact path="/lineastrasporte/update/:id" component={ LineasTransporteUpdate } />
            <Route exact path="/operadores" component={ Operadores } />
            <Route exact path="/operadores/create" component={ OperadorCreate } />
            <Route exact path="/operadores/update/:id" component={ OperadorUpdate } />
            <Route exact path="/cajas" component={ Cajas } />
            <Route exact path="/cajas/create" component={ CajaCreate } />
            <Route exact path="/cajas/update/:id" component={ CajaUpdate } />
            <Route exact path="/camiones" component={ Camiones } />
            <Route exact path="/camiones/create" component={ CamionCreate } />
            <Route exact path="/camiones/update/:id" component={ CamionUpdate } />
            <Route exact path="/statusruta" component={ StatusRuta } />
            <Route exact path="/statusruta/create" component={ StatusRutaCreate } />
            <Route exact path="/statusruta/update/:id" component={ StatusRutaUpdate } />
            <Route exact path="/ubicaciones" component={ Ubicaciones } />
            <Route exact path="/ubicaciones/create" component={ UbicacionCreate } />
            <Route exact path="/ubicaciones/update/:id" component={ UbicacionUpdate } />
            <Route exact path="/equiposgps" component={ EquiposGps } />
            <Route exact path="/equiposgps/create" component={ EquipoGpsCreate } />
            <Route exact path="/equiposgps/update/:id" component={ EquipoGpsUpdate } />
            <Route exact path="/eventos/update/:id" component={ EventoUpdate } />
            <Route exact path="/eventos" component={ Rutas } />
            <Route exact path="/eventos/detail/:id" component={ RutasDetail } />
        </>
    );
}

export default Routes;