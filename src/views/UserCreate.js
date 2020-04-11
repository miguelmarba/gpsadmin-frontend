import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';

function Users() {
    return (
    <>
    <Layout title="Crear un Nuevo Usuario" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Usuario</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user">
                    <div className="form-group">
                        <input type="text" className="form-control form-control-user" id="nombre" placeholder="Nombre" />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Apellido Paterno" />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Apellido Materno" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Correo electrónico" />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/users" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button id="createUser" class="btn btn-success btn-user btn-block">
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
    </>
    );
}

export default Users;