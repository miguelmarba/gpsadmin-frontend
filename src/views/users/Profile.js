import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Layout from '../../common/Layout';
import gql from 'graphql-tag';

const GET_PROFILE =  gql`
    query getMe{
        me{
            email
            nombre
            apellido_paterno
            apellido_materno
            telefono
        }
    }
`;

function Profile(){
    const { data, loading, error } = useQuery(GET_PROFILE);
    return (
        <>
        <Layout title="Perfil">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Mi Perfil</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-lg-12 mx-auto table-responsive">
                                <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>
                                            <p>{ data ? data.me.nombre: ''}</p>
                                        </td>
                                        <th>Fecha de Nacimiento</th>
                                        <td>{ data ? data.me.nombre: ''}</td>
                                    </tr>
                                    <tr>
                                        <th>Apellido Paterno</th>
                                        <td>
                                            <p>{ data ? data.me.apellido_paterno: ''}</p>
                                        </td>
                                        <th>Apellido Materno</th>
                                        <td>
                                            <p>{ data ? data.me.apellido_materno: ''}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Correo Electrónico</th>
                                        <td>
                                            <p>{ data ? data.me.email: ''}</p>
                                        </td>
                                        <th>Teléfono</th>
                                        <td>
                                            <p>{ data ? data.me.telefono: ''}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    );
};

export default Profile;