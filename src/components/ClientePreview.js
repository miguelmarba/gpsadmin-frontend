import React from 'react';

function ClientePreview({cliente}) {
    return (
        <div className="row">
            <div className="col-lg-12 col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="4"><h2>Cliente</h2></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Nombre</th>
                                    <td>{ cliente.nombre }</td>
                                    <th>Teléfono</th>
                                    <td>{ cliente.telefono }</td>
                                </tr>
                                <tr>
                                    <th>RFC</th>
                                    <td>{ cliente.rfc }</td>
                                    <th>Celular</th>
                                    <td>{ cliente.celular }</td>
                                </tr>
                                <tr>
                                    <th>Contacto</th>
                                    <td>{ cliente.nombre_contacto }</td>
                                    <th>CP</th>
                                    <td>{ cliente.cp }</td>
                                </tr>
                                <tr>
                                    <th>Correo electrónico</th>
                                    <td>{ cliente.email }</td>
                                    <th>Dirección</th>
                                    <td>{ cliente.direccion }</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientePreview;