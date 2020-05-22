import React from 'react';
import { Link } from 'react-router-dom';
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


function TrackingPreview({ruta_id, cliente}) {
    const [ sendTracking ] = useMutation(CREATE_TRACK);
    
    const catchData = async (inputs) => {
        console.log("Resultado catchData inputs");
        console.log(inputs);
        const { data, errors } = await sendTracking({variables:{data:{...inputs}}});
        console.log("Resultado sendTracking");
        console.log(data);
        if(errors) {
            console.log("HAY errores al guardar la caja");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
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

    console.log("Resultado ruta");
    console.log(objRuta);

    return (
        <div className="row">
            <div className="col-lg-12 col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12 col-md-10 mx-auto">
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <select name="tipo_monitoreo" className="form-control bg-light border-0 small" onChange={onHandleChangeSelect} value={inputs.status_ruta}>
                                        <option value="">-Selecciona el status-</option>
                                        <option value="CUSTODIA">Custodia</option>
                                        <option value="DEDICADO" >Dedicado</option>
                                    </select>
                                    <input type="text" name="comentarios" onChange={handleInputChange}  value={inputs.comentarios} className="form-control bg-light border-0 small" placeholder="Comentarios" aria-label="Comentarios" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-success" type="submit">
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
                                            <th colSpan="4"><h2>Tracking</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{ cliente.email }</th>
                                            <td>{ cliente.nombre }</td>
                                        </tr>
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