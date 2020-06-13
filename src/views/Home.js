import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import authenticate from '../utils/authenticate';

function Home({history}) {
    const {isAuthenticated, payload} = authenticate();
    if(!isAuthenticated){
        history.push('/login');
    }
    return (
    <>
    <Layout title="Home" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Bienvenido { isAuthenticated ? payload.nombre: ''}</h1>
            <Link to="/eventos/create" className="d-sm-inline-block btn btn-lg btn-success shadow-sm">
                    <i className="fas fa-plus fa-lg text-white-50"></i> Crear nueva ruta
            </Link>
        </div>
    </Layout>
    </>
    );
}

export default Home;