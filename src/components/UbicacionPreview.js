import React from 'react';

function UbicacionPreview({ubicacion, nombre}) {
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
                                    <td>{ ubicacion.nombre }</td>
                                    <th>Pais</th>
                                    <td>{ ubicacion.pais }</td>
                                </tr>
                                <tr>
                                    <th>CP</th>
                                    <td>{ ubicacion.cp }</td>
                                    <th>Estado</th>
                                    <td>{ ubicacion.estado }</td>
                                </tr>
                                <tr>
                                    <th>Calle</th>
                                    <td>{ ubicacion.calle }</td>
                                    <th>Municipio</th>
                                    <td>{ ubicacion.municipio }</td>
                                </tr>
                                <tr>
                                    <th>Número exterior</th>
                                    <td>{ ubicacion.numero_exterior }</td>
                                    <th>Número interior</th>
                                    <td>{ ubicacion.numero_interior }</td>
                                </tr>
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UbicacionPreview;