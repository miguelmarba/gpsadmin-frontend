import React from 'react';

function CamionPreview({equipo_gps, nombre}) {
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
                                    <th>Descripción</th>
                                    <td>{ equipo_gps.descripcion }</td>
                                    <th>Modelo</th>
                                    <td>{ equipo_gps.modelo }</td>
                                </tr>
                                <tr>
                                    <th>Marca</th>
                                    <td>{ equipo_gps.marca }</td>
                                    <th>Identificador</th>
                                    <td>{ equipo_gps.identificador }</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CamionPreview;