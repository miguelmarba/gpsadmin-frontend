import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormRuta';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';
import authHOC from '../../utils/authHOC';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ALL_STATUS_RUTA =  gql`
    query getAllStatusRuta{
        getStatusRuta{
            _id
            nombre
        }
    }
`;

const ALL_CLIENTES =  gql`
    query getAllClientes($nombre:String!){
        getSearchCliente(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const GET_LINEAS_TRANSPORTE =  gql`
    query getAllLineaTransporte($nombre:String!){
        getSearchLineaTransporte(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const CREATE_RUTA = gql`
    mutation createRuta($data:RutaInput!){
        createNewRuta(data:$data){
            _id
        }
    }
`;

const GET_UBICACION_ORIGEN =  gql`
    query searchUbicacionOrigen($nombre:String!){
        getSearchUbicacion(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const GET_OPERADORES =  gql`
    query searchOperador($nombre:String!){
        getSearchOperador(nombre:$nombre){
            _id
            nombre
            apellido_paterno
            apellido_materno
        }
    }
`;

const GET_CAMIONES =  gql`
    query searchCamion($descripcion:String!){
        getSearchCamion(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

const GET_CAJAS =  gql`
    query searchCaja($descripcion:String!){
        getSearchCaja(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

const GET_EQUIPOS_GPS =  gql`
    query searchEquipoGps($descripcion:String!){
        getSearchEquipoGps(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

function EventoCreate({history})  {
    const { loading, error, data } = useQuery(ALL_STATUS_RUTA);
    const [ getClientes ] = useMutation(ALL_CLIENTES);
    const [ getLineasTransporte ] = useMutation(GET_LINEAS_TRANSPORTE);
    const [ getUbicacionOrigen ] = useMutation(GET_UBICACION_ORIGEN);
    const [ getOperador ] = useMutation(GET_OPERADORES);
    const [ getCamion ] = useMutation(GET_CAMIONES);
    const [ getCaja ] = useMutation(GET_CAJAS);
    const [ getEquipoGps ] = useMutation(GET_EQUIPOS_GPS);
    const [ sendRuta ] = useMutation(CREATE_RUTA);
    const [ frmDisabled, setFrmDisable] = useState(true);

    const onHandleSearchClientes = async (query) => {
        if(query.length >= 5){
            handleInputOptions('cliente', []);
            const { data } = await getClientes({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchCliente){
                    const searchResults = data.getSearchCliente.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                    }));
                    handleInputOptions('cliente', searchResults);
                }
            }
        } else {
            handleInputOptions('cliente', []);
        }
    };

    const onHandleSearchLineasTransporte = async (query) => {
        if(query.length >= 5){
            handleInputOptions('linea_transporte', []);
            const { data } = await getLineasTransporte({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchLineaTransporte){
                    const searchResults = data.getSearchLineaTransporte.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                    }));
                    handleInputOptions('linea_transporte', searchResults);
                }
            }
        } else {
            handleInputOptions('linea_transporte', []);
        }
    };

    const onHandleSearchOrigen = async (query) => {
        if(query.length >= 5){
            handleInputOptions('origen', []);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                    }));
                    handleInputOptions('origen', searchResults);
                }
            }
        } else {
            handleInputOptions('origen', []);
        }
    };

    const onHandleSearchDestino = async (query) => {
        if(query.length >= 5){
            handleInputOptions('destino', []);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre
                    }));
                    handleInputOptions('destino', searchResults);
                }
            }
        } else {
            handleInputOptions('destino', []);
        }
    };

    const onHandleSearchOperador = async (query) => {
        if(query.length >= 5){
            handleInputOptions('operador', []);
            const { data, errors } = await getOperador({variables:{nombre:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchOperador){
                    const searchResults = data.getSearchOperador.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                        apellido_paterno : i.apellido_paterno,
                        apellido_materno : i.apellido_materno
                    }));
                    handleInputOptions('operador', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        } else {
            handleInputOptions('operador', []);
        }
    };

    const onHandleSearchCamion = async (query) => {
        if(query.length >= 4){
            handleInputOptions('camion', []);
            const { data, errors } = await getCamion({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchCamion){
                    const searchResults = data.getSearchCamion.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('camion', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        } else {
            handleInputOptions('camion', []);
        }
    };

    const onHandleSearchCaja = async (query) => {
        if(query.length >= 4){
            handleInputOptions('caja', []);
            const { data, errors } = await getCaja({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchCaja){
                    const searchResults = data.getSearchCaja.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('caja', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        } else {
            handleInputOptions('caja', []);
        }
    };

    const onHandleSearchEquipoGps = async (query) => {
        if(query.length >= 5){
            handleInputOptions('equipo_gps', []);
            const { data, errors } = await getEquipoGps({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchEquipoGps){
                    const searchResults = data.getSearchEquipoGps.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('equipo_gps', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        } else {
            handleInputOptions('equipo_gps', []);
        }
    };

    const onHandleTypeahead = (name, value) => {
        switch (name) {
            case 'cliente':
                setFrmDisable(false);
                handleInputSelected('cliente', value);
                break;
            case 'origen':
                handleInputSelected('origen', value);
                break;
            case 'destino':
                handleInputSelected('destino', value);
                break;
            case 'linea_transporte':
                handleInputSelected('linea_transporte', value);
                break;
            case 'operador':
                handleInputSelected('operador', value);
                break;
            case 'camion':
                handleInputSelected('camion', value);
                break;
            case 'caja':
                handleInputSelected('caja', value);
                break;
            case 'equipo_gps':
                handleInputSelected('equipo_gps', value);
                break;
        
            default:
                break;
        }
    };

    const onHandleChangeSelect = (event) => {
        const {name, value} = event.target;
        handleInputChange(name, value);
    }

    const handleInputFechaSalida = (date) =>{
        handleInputChange('fecha_salida', date);
    };

    const handleChangeFechaCita = (date) =>{
        handleInputChange('fecha_cita', date);
    };

    const catchData = async (inputs) => {
        if(Object.entries(inputs).length > 0) {
            const { data, errors } = await sendRuta({variables:{data:{...inputs}}});
            if(errors) {
                console.log("HAY errores al guardar el usuario");
                console.log(errors);
            }
            if (data) {
                if (data.errors) console.log(data.errors);
                const id = data.createNewRuta._id; 
                history.push('/eventos/detail/' + id);
            }
        }
    };

    const multiple = false;

    const initialData = {
        fecha_salida: new Date(),
        fecha_cita: new Date()
    };

    const {
        inputs,
        handleInputChange,
        handleInputOptions,
        handleSubmit,
        handleInputSelected,
        options,
        selected
    } = useForm(catchData, initialData);

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <>
        <Layout title="Crear un Nuevo Usuario" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Evento</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="cliente"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.cliente}
                                    placeholder="Selecciona el cliente..."
                                    selected={selected.cliente}
                                    className="border-left-danger"
                                    searchText="Buscando clientes..."
                                    onInputChange={onHandleSearchClientes}
                                    onChange={(value)=>onHandleTypeahead('cliente', value)}
                                    inputClassName="notwork"
                                    required={true}
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="origen"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.origen}
                                    placeholder="Selecciona el origen..."
                                    selected={selected.origen}
                                    //className="form-control form-control-user"
                                    searchText="Buscando origen..."
                                    onInputChange={onHandleSearchOrigen}
                                    onChange={(value)=>onHandleTypeahead('origen', value)}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <Typeahead 
                                    filterBy={(option, props) => {return true;}}
                                    id="destino"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.destino}
                                    placeholder="Selecciona el destino..."
                                    selected={selected.destino}
                                    //className={"form-control form-control-user"}
                                    searchText="Buscando destino..."
                                    onInputChange={onHandleSearchDestino}
                                    onChange={(value)=>onHandleTypeahead('destino', value)}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <label className="mb-1 small" style={{padding: '0 5px'}}>Fecha salida</label>
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={inputs.fecha_salida?inputs.fecha_salida:new Date()}
                                onChange={handleInputFechaSalida}
                                name="fecha_salida"
                                flaceholderText="Fecha de salida"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Hora"
                                dateFormat="d/MM/yyyy h:mm"
                                minDate={new Date()}
                                />
                            </div>
                            <div className="col-sm-6">
                            <label className="mb-1 small" style={{padding: '0 5px'}}>Fecha cita</label>
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={inputs.fecha_cita?inputs.fecha_cita:new Date()}
                                onChange={handleChangeFechaCita}
                                name="fecha_cita"
                                flaceholderText="Fecha de cita"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Hora"
                                dateFormat="d/MM/yyyy h:mm"
                                minDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <Typeahead //style={typeheadstyle}
                                    filterBy={(option, props) => {return true;}}
                                    id="linea_transporte"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.linea_transporte}
                                    placeholder="Selecciona la linea de transporte..."
                                    selected={selected.linea_transporte}
                                    //className="form-control form-control-user"
                                    searchText="Buscando lineas de transportes..."
                                    onInputChange={onHandleSearchLineasTransporte}
                                    onChange={(value)=>onHandleTypeahead('linea_transporte', value)}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className="form-control form-control-user">
                                    <select name="status_ruta" className="form-group selectBox" onChange={onHandleChangeSelect} value={inputs.status_ruta?inputs.status_ruta:''}>
                                        <option value="">-Selecciona status de la ruta-</option>
                                        { data.getStatusRuta.map((status) => (
                                        <option key={status._id} value={status._id}>{status.nombre}</option>
                                        )) }
                                    </select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="operador"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.operador}
                                    placeholder="Selecciona el operador..."
                                    selected={selected.operador}
                                    //className="form-control form-control-user"
                                    searchText="Buscando operadores..."
                                    onInputChange={onHandleSearchOperador}
                                    onChange={(value)=>onHandleTypeahead('operador', value)}
                                    inputClassName="notwork"
                                    />
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className="form-control form-control-user">
                                        <select name="tipo_servicio" className="form-group selectBox" onChange={onHandleChangeSelect} value={inputs.tipo_servicio?inputs.tipo_servicio:''}>
                                            <option value="">-Selecciona el tipo de servicio-</option>
                                            <option value="EXPRESS">Express</option>
                                            <option value="NORMAL" >Normal</option>
                                        </select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="camion"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.camion}
                                    placeholder="Selecciona el camion..."
                                    selected={selected.camion}
                                    //className="form-control form-control-user"
                                    searchText="Buscando camiones..."
                                    onInputChange={onHandleSearchCamion}
                                    onChange={(value)=>onHandleTypeahead('camion', value)}
                                    inputClassName="notwork"
                                    />
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className="form-control form-control-user">
                                        <select name="tipo_monitoreo" className="form-group selectBox" onChange={onHandleChangeSelect} value={inputs.tipo_monitoreo?inputs.tipo_monitoreo:'DEDICADO'}>
                                            <option value="O">-Selecciona el tipo de monitoreo-</option>
                                            <option value="CUSTODIA">Custodia</option>
                                            <option value="DEDICADO" >Dedicado</option>
                                        </select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="caja"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.caja}
                                    placeholder="Selecciona el caja..."
                                    selected={selected.caja}
                                    //className="form-control form-control-user"
                                    searchText="Buscando cajas..."
                                    onInputChange={onHandleSearchCaja}
                                    onChange={(value)=>onHandleTypeahead('caja', value)}
                                    inputClassName="notwork"
                                    />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" onChange={onHandleChangeSelect}  value={inputs.folio?inputs.folio:''} className="form-control form-control-user" name="folio" placeholder="Folio" required={false} />
                            </div>
                        </div>
                        <div className="form-group">
                        <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="gps"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.equipo_gps}
                                    placeholder="Selecciona el equipo Gps..."
                                    selected={selected.equipo_gps}
                                    //className="form-control form-control-user"
                                    searchText="Buscando equipo Gps..."
                                    onInputChange={onHandleSearchEquipoGps}
                                    onChange={(value)=>onHandleTypeahead('equipo_gps', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-4 mb-2 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/" >Cancelar</Link>
                            </div>
                            <div className="col-sm-4 mb-2 mb-sm-0">
                                <button type="submit" name="guardar" disabled={frmDisabled}  className="btn btn-success btn-user btn-block">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
        </>
    );
}

export default authHOC(EventoCreate);