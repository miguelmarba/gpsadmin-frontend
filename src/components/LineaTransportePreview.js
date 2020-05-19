import React from 'react';

function LineaTransportePreview({linea, nombre}) {
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
                                    <td>{ linea.nombre }</td>
                                    <th>Celular</th>
                                    <td>{ linea.celular }</td>
                                </tr>
                                <tr>
                                    <th>Contacto</th>
                                    <td>{ linea.contacto }</td>
                                    <th>C.P.</th>
                                    <td>{ linea.cp }</td>
                                </tr>
                                <tr>
                                    <th>Correo electrónico</th>
                                    <td>{ linea.email }</td>
                                    <th>Dirección</th>
                                    <td>{ linea.direccion }</td>
                                </tr>
                                <tr>
                                    <th>Teléfono</th>
                                    <td>{ linea.telefono }</td>
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

export default LineaTransportePreview;