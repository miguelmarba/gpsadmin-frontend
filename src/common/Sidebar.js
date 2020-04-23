import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-truck-moving"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">GPS Admin <sup>^</sup></div>
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
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <Collapse isOpen={isOpen} className="collapse">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <Link className="collapse-item" to="/clientes">Clientes</Link>
                            <Link className="collapse-item" to="/lineastrasporte">Lineas de Transporte</Link>
                            <Link className="collapse-item" to="/operadores">Operadores</Link>
                            <Link className="collapse-item" to="/Cajas">Cajas</Link>
                            <Link className="collapse-item" to="/camiones">Camiones</Link>
                            <Link className="collapse-item" to="/statusruta">Status Ruta</Link>
                            <Link className="collapse-item" to="/ubicaciones">Ubicaciones</Link>
                            <Link className="collapse-item" to="/users">Usuarios</Link>
                        </div>
                    </Collapse>
                </li>

                {/* Nav Item - Utilities Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#collapseUtilities" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <Link className="collapse-item" to="/">Colors</Link>
                            <Link className="collapse-item" to="/">Borders</Link>
                            <Link className="collapse-item" to="/">Animations</Link>
                            <Link className="collapse-item" to="/">Other</Link>
                        </div>
                    </div>
                </li>

                {/* Divider */}
                <hr className="sidebar-divider"></hr>

                {/* Heading */}
                <div className="sidebar-heading">
                    Addons
                </div>

                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
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
                </li>

                {/* Nav Item - Charts */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></Link>
                </li>

                {/* Nav Item - Tables */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></Link>
                </li>

                {/* Divider */}
                <hr className="sidebar-divider d-none d-md-block"></hr>

                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </>
    );
}

export default Sidebar;