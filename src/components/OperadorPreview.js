import React from 'react';

function OperadorPreview({operador, nombre}) {
    return (
        <div className="row">
            <div className="col-lg-12 col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="4"><h2>{ nombre }</h2></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Nombre</th>
                                    <td>{ operador.nombre }</td>
                                    <th>Teléfono</th>
                                    <td>{ operador.telefono }</td>
                                </tr>
                                <tr>
                                    <th>Apellido Paterno</th>
                                    <td>{ operador.apellido_paterno }</td>
                                    <th>Celular</th>
                                    <td>{ operador.celular }</td>
                                </tr>
                                <tr>
                                    <th>Apellido Materno</th>
                                    <td>{ operador.apellido_materno }</td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Correo electrónico</th>
                                    <td>{ operador.email }</td>
                                    <th></th>
                                    <td></td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperadorPreview;