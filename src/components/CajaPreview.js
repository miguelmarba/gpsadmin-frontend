import React from 'react';

function CajaPreview({caja, nombre}) {
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
                                    <td>{ caja.descripcion }</td>
                                    <th>Placas Americanas</th>
                                    <td>{ caja.placas_americanas }</td>
                                </tr>
                                <tr>
                                    <th>Placas</th>
                                    <td>{ caja.placas }</td>
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

export default CajaPreview;