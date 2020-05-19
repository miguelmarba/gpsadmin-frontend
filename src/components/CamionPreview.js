import React from 'react';

function CamionPreview({camion, nombre}) {
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
                                    <td>{ camion.descripcion }</td>
                                    <th>Color</th>
                                    <td>{ camion.color }</td>
                                </tr>
                                <tr>
                                    <th>Placas</th>
                                    <td>{ camion.placas }</td>
                                    <th>Cuenta Espejo</th>
                                    <td>{ camion.cuenta_espejo }</td>
                                </tr>
                                <tr>
                                    <th>Modelo</th>
                                    <td>{ camion.modelo }</td>
                                    <th>Tipo Unidad</th>
                                    <td>{ camion.tipo_unidad }</td>
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