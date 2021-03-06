import React, { useState, useEffect} from 'react';
import gql from 'graphql-tag';
import { useMutation} from 'react-apollo-hooks';
import useForm from '../hooks/useFormTracking';
import moment from 'moment';

const CREATE_TRACK = gql`
    mutation createTracking($data:TrackingInput!){
        createNewTracking(data:$data){
            _id
            comentarios
            created
            user{
                _id
                nombre
            }
            status_ruta{
                _id
                nombre
                color
            }
        }
    }
`;

function TrackingPreview({ruta_id, tracking, statusRuta, setNewStatus}) {
    const [ sendTracking ] = useMutation(CREATE_TRACK);
    const [ tracks, setTracks ] = useState(tracking);
    const [ disabledAgregar, setDisabledAgregar ] = useState(false);

    useEffect(() => {
        setTracks(tracking);
    }, [tracking]);
    
    const catchData = async (inputs) => {
        setDisabledAgregar(true);
        const { data, errors } = await sendTracking({variables:{data:{...inputs}}});
        setDisabledAgregar(false);
        handleSetInput('status_ruta', '');
        handleSetInput('comentarios', '');
        delete inputs.comentarios;
        if(errors) {
            console.log("HAY errores al guardar la tracking");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors);
            if(data.createNewTracking){
                setTracks(state => [data.createNewTracking, ...state]);
                if(data.createNewTracking.status_ruta){
                    setNewStatus(data.createNewTracking.status_ruta);
                }
            }
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

    return (
        <div className="row">
            <div className="col-lg-12 col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12 col-md-10 mx-auto">
                            <form className="form-inline" onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <select name="status_ruta" className="form-control bg-light border-0 small" onChange={onHandleChangeSelect} value={inputs.status_ruta}>
                                        <option value="">-Selecciona el status-</option>
                                        { statusRuta.getStatusRuta.map((status) => (
                                        <option key={status._id} value={status._id}>{status.nombre}</option>
                                        )) }
                                    </select>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <textarea className="form-control bg-light border-0" name="comentarios" cols="80" rows="1" onChange={handleInputChange}  value={inputs.comentarios?inputs.comentarios:''} required={true} ></textarea>
                                </div>
                                <button className="btn btn-success" type="submit" disabled={disabledAgregar}>
                                    Agregar comentario
                                        {/* <i className="fas fa-search fa-sm"></i> */}
                                </button>
                            </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-10 mx-auto table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="4"><h2>Tracking</h2></th>
                                        </tr>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Comentarios</th>
                                            <th>Status</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { tracks ? (tracks.map((track) => (
                                        <tr key={track._id}>
                                            <th>{ track.user.nombre }</th>
                                            <td>{ track.comentarios }</td>
                                            <th>{ track.status_ruta?track.status_ruta.nombre:'-' }</th>
                                            <th>{ track.created?moment(track.created).format('DD MMMM YYYY h:mm'):'Sin fecha' }</th>
                                        </tr>
                                        )) ) : (null) }
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