import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';
import useForm from '../hooks/useFormTracking';

const CREATE_TRACK = gql`
    mutation createTracking($data:TrackingInput!){
        createNewTracking(data:$data){
            _id
        }
    }
`;

function TrackingPreview({ruta_id, tracking, statusRuta}) {
    const [ sendTracking ] = useMutation(CREATE_TRACK);
    const [ disabledAgregar, setDisabledAgregar ] = useState(false);
    
    const catchData = async (inputs) => {
        setDisabledAgregar(true);
        const { data, errors } = await sendTracking({variables:{data:{...inputs}}});
        setDisabledAgregar(false);
        if(errors) {
            console.log("HAY errores al guardar la caja");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors);
            delete inputs.status_ruta;
            delete inputs.comentarios;
        }
    };

    const onHandleChangeSelect = (event) => {
        const {name, value} = event.target;
        handleSetInput(name, value);
    }

    const objRuta = {ruta: ruta_id};

    const {
        inputs,
        handleInputChange,
        handleSetInput,
        handleSubmit
    } = useForm(catchData, objRuta);

    console.log("Resultado inputs");
    console.log(inputs);

    return (
        <div className="row">
            <div className="col-lg-12 col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12 col-md-10 mx-auto">
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <select name="status_ruta" className="form-control bg-light border-0 small" onChange={onHandleChangeSelect} value={inputs.status_ruta}>
                                        <option value="">-Selecciona el status-</option>
                                        { statusRuta.getStatusRuta.map((status) => (
                                        <option key={status._id} value={status._id}>{status.nombre}</option>
                                        )) }
                                    </select>
                                    <input type="text" name="comentarios" onChange={handleInputChange}  value={inputs.comentarios} className="form-control bg-light border-0 small" placeholder="Comentarios" aria-label="Comentarios" aria-describedby="basic-addon2" required={true} />
                                    <div className="input-group-append">
                                        <button className="btn btn-success" type="submit" disabled={disabledAgregar}>
                                            Agregar
                                            {/* <i className="fas fa-search fa-sm"></i> */}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-10 mx-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="3"><h2>Tracking</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { tracking.map((track) => (
                                        <tr key={track._id}>
                                            <th>{ track.user.nombre }</th>
                                            <td>{ track.comentarios }</td>
                                            <th>{ track.status_ruta?track.status_ruta.nombre:'-' }</th>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackingPreview;