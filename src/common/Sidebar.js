import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import authenticate from '../utils/authenticate';

function Sidebar({isMenuOpen, toggleMenu}){
    const {payload} = authenticate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRep, setIsOpenRep] = useState(false);

    const toggle = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const toggleRep = (e) => {
        e.preventDefault();
        setIsOpenRep(!isOpenRep);
    };
    return (
        <>
            <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" + (isMenuOpen?" d-none":"")} id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-truck-moving"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">TeSigo<sup>^</sup></div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0"></hr>
                {/* Nav Item - Dashboard  */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Inicio</span></Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider"></hr>
                {/* Heading */}
                <div className="sidebar-heading">
                    Interface
                </div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" onClick={toggle} href="#Componentsclear">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Catálogos</span>
                    </a>
                    <Collapse isOpen={isOpen} className="collapse">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Ajuste parámetros:</h6>
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/clientes">Clientes</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/lineastrasporte">Lineas de Transporte</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/operadores">Operadores</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/equiposgps">Equpos Gps</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/cajas">Cajas</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/camiones">Camiones</Link>}
                            {payload.rol === 'ADMINISTRADOR' && <Link className="collapse-item" to="/statusruta">Status Ruta</Link>}
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA' || payload.rol === 'CUSTODIO') && <Link className="collapse-item" to="/ubicaciones">Ubicaciones</Link>}
                            {payload.rol === 'ADMINISTRADOR' && <Link className="collapse-item" to="/users">Usuarios</Link>}
                        </div>
                    </Collapse>
                </li>

                {/* Nav Item - Utilities Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" onClick={toggleRep} href="#collapseUtilities">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Informes</span>
                    </a>
                    <Collapse isOpen={isOpenRep} className="collapse">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Reportes Útiles:</h6>
                            {(payload.rol === 'ADMINISTRADOR' || payload.rol === 'MONITORISTA') && <Link className="collapse-item" to="/eventos">Rutas en proceso</Link>}
                            <Link className="collapse-item" to="/eventosbydates">Rutas por fecha</Link>
                            <Link className="collapse-item" to="/">Rutas cerradas</Link>
                            <Link className="collapse-item" to="/">Incidencias</Link>
                        </div>
                    </Collapse>
                </li>

                {/* Divider */}
                <hr className="sidebar-divider"></hr>

                {/* Heading */}
                {/* <div className="sidebar-heading">
                    Addons
                </div> */}

                {/* Nav Item - Pages Collapse Menu */}
                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#collapsePages" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <Link className="collapse-item" to="/">Login</Link>
                        <Link className="collapse-item" to="/">Register</Link>
                        <Link className="collapse-item" to="/">Forgot Password</Link>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <Link className="collapse-item" to="/">404 Page</Link>
                        <Link className="collapse-item" to="/">Blank Page</Link>
                    </div>
                    </div>
                </li> */}

                {/* Nav Item - Charts */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></Link>
                </li> */}

                {/* Nav Item - Tables */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></Link>
                </li> */}

                {/* Divider */}
                {/* <hr className="sidebar-divider d-none d-md-block"></hr> */}

                {/* Sidebar Toggler (Sidebar) */}
                {/* <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div> */}
            </ul>
        </>
    );
}

export default Sidebar;