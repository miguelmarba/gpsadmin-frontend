import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormRuta';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ALL_USERS =  gql`
    query getAllUsers{
        getUsers{
            _id
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
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

const CREATE_USER = gql`
    mutation createUser($data:UserInput!){
        createNewUser(data:$data){
            _id
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

const typeheadstyle = {
    "font-size": '0.8rem',
    "border-radius": '10rem',
    padding: '1.5rem 1rem',
}

const typeheadstyle2 = {
    padding: '0 0',
    border: '0 !important'
}

const typeheadstyle3 = {
    border: '0 !important'
}

function EventoCreate({history})  {
    const [ getUsers ] = useMutation(ALL_USERS);
    const [ getClientes ] = useMutation(ALL_CLIENTES);
    const [ getLineasTransporte ] = useMutation(GET_LINEAS_TRANSPORTE);
    const [ getUbicacionOrigen ] = useMutation(GET_UBICACION_ORIGEN);
    const [ getOperador ] = useMutation(GET_OPERADORES);
    const [ getCamion ] = useMutation(GET_CAMIONES);
    const [ getCaja ] = useMutation(GET_CAJAS);
    const [ getEquipoGps ] = useMutation(GET_EQUIPOS_GPS);
    const [ sendUser ] = useMutation(CREATE_USER);
    const [ sendRuta ] = useMutation(CREATE_RUTA);
    const [optionsCliente, setOptionsCliente] = useState([]);
    const [optionsOrigen, setOptionsOrigen] = useState([]);
    const [optionsDestino, setOptionsDestino] = useState([]);
    const [optionsLineasTransporte, setOptionsLineasTransporte] = useState([]);
    const [optionsOperador, setOptionsOperador] = useState([]);
    const [optionsCamion, setOptionsCamion] = useState([]);
    const [optionsCaja, setOptionsCaja] = useState([]);
    const [optionsEquipoGps, setOptionsEquipoGps] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState([]);
    const [selectedOrigen, setSelectedOrigen] = useState([]);
    const [selectedDestino, setSelectedDestino] = useState([]);
    const [selectedLineasTransporte, setSelectedLineasTransporte] = useState([]);
    const [selectedOperador, setSelectedOperador] = useState([]);
    const [selectedCamion, setSelectedCamion] = useState([]);
    const [selectedCaja, setSelectedCaja] = useState([]);
    const [selectedEquipoGps, setSelectedEquipoGps] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('06:00');

    const onHandleSearchClientes = async (query) => {
        if(query.length >= 3){
            setOptionsCliente([]);
            try {
                const { data, errors } = await getClientes({variables:{nombre:query}});
                if (data) {
                    // LLenamos options
                    if(Array.isArray(data.getSearchCliente)){
                        const searchResults = data.getSearchCliente.map((i) => ({
                            id : i._id,
                            nombre : i.nombre
                        }));
                        setOptionsCliente(searchResults);
                    } else {
                        const searchResult = [{
                            id : data.getSearchCliente._id,
                            nombre : data.getSearchCliente.nombre
                        }];
                        setOptionsCliente(searchResult);
                    }
                }
                if (errors) {
                    setOptionsCliente([]);
                }
            } catch (e) {
                setOptionsCliente([]);
            }
        }
    };

    const onHandleSearchLineasTransporte = async (query) => {
        if(query.length >= 3){
            setOptionsCliente([]);
            try {
                const { data, errors } = await getLineasTransporte({variables:{nombre:query}});
                if (data) {
                    // LLenamos options
                    if(Array.isArray(data.getSearchLineaTransporte)){
                        const searchResults = data.getSearchLineaTransporte.map((i) => ({
                            id : i._id,
                            nombre : i.nombre
                        }));
                        setOptionsLineasTransporte(searchResults);
                    } else {
                        const searchResult = [{
                            id : data.getSearchLineaTransporte._id,
                            nombre : data.getSearchLineaTransporte.nombre
                        }];
                        setOptionsLineasTransporte(searchResult);
                    }
                }
                if (errors) {
                    setOptionsLineasTransporte([]);
                }
            } catch (e) {
                setOptionsLineasTransporte([]);
            }
        }
    };

    const onHandleSearchOrigen = async (query) => {
        if(query.length >= 5){
            setOptionsOrigen([]);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                    }));
                    setOptionsOrigen(searchResults);
                }
            }
        }
    };

    const onHandleSearchDestino = async (query) => {
        if(query.length >= 5){
            setOptionsDestino([]);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            console.log("Resultado onHandleSearch:");
            console.log(data);
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre
                    }));
                    setOptionsDestino(searchResults);
                }
            }
        }
    };

    const onHandleSearchOperador = async (query) => {
        if(query.length >= 5){
            setOptionsOperador([]);
            const { data, errors } = await getOperador({variables:{nombre:query}});
            console.log("Resultado onHandleSearchOperador:");
            console.log(data);
            if (data) { 
                // LLenamos options
                if(data.getSearchOperador){
                    const searchResults = data.getSearchOperador.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                        apellido_paterno : i.apellido_paterno,
                        apellido_materno : i.apellido_materno
                    }));
                    setOptionsOperador(searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchCamion = async (query) => {
        if(query.length >= 5){
            setOptionsCamion([]);
            const { data, errors } = await getCamion({variables:{descripcion:query}});
            console.log("Resultado onHandleSearchOperador:");
            console.log(data);
            if (data) { 
                // LLenamos options
                if(data.getSearchCamion){
                    const searchResults = data.getSearchCamion.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    setOptionsCamion(searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchCaja = async (query) => {
        if(query.length >= 5){
            setOptionsCaja([]);
            const { data, errors } = await getCaja({variables:{descripcion:query}});
            console.log("Resultado onHandleSearchOperador:");
            console.log(data);
            if (data) { 
                // LLenamos options
                if(data.getSearchCaja){
                    const searchResults = data.getSearchCaja.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    setOptionsCaja(searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchEquipoGps = async (query) => {
        if(query.length >= 5){
            setOptionsEquipoGps([]);
            const { data, errors } = await getEquipoGps({variables:{descripcion:query}});
            console.log("Resultado onHandleSearchOperador:");
            console.log(data);
            if (data) { 
                // LLenamos options
                if(data.getSearchEquipoGps){
                    const searchResults = data.getSearchEquipoGps.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    setOptionsEquipoGps(searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleTypeahead = (name, value) => {
        console.log("===Resultado onHandleTypeahead");
        console.log(name);
        console.log(value);
        switch (name) {
            case 'cliente':
                setSelectedCliente(value);
                handleInputSelected('cliente', value[0].id);
                break;
            case 'origen':
                handleInputSelected('origen', value[0].id)
                setSelectedOrigen(value);
                break;
            case 'destino':
                handleInputSelected('destino', value[0].id)
                setSelectedDestino(value);
                break;
            case 'lineatransporte':
                handleInputSelected('lineatransporte', value[0].id)
                setSelectedLineasTransporte(value);
                break;
            case 'operador':
                handleInputSelected('operador', value[0].id)
                setSelectedOperador(value);
                break;
            case 'camion':
                handleInputSelected('camion', value[0].id)
                setSelectedCamion(value);
                break;
            case 'caja':
                handleInputSelected('caja', value[0].id)
                setSelectedCaja(value);
                break;
            case 'equipogps':
                handleInputSelected('equipogps', value[0].id)
                setSelectedEquipoGps(value);
                break;
        
            default:
                break;
        }
    };

    const handleChangeStartDate = (date) =>{
        setStartDate(date);
    };

    const catchData = async (inputs) => {
        const { data, errors } = await sendRuta({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el usuario");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/');
        }
    };
    const multiple = false;

    const {
        inputs,
        handleInputChange,
        handleSubmit,
        handleInputSelected
    } = useForm(catchData);

    console.log("===Resultado inputs");
    console.log(inputs);

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
                                    options={optionsCliente}
                                    placeholder="Selecciona el cliente..."
                                    selected={selectedCliente}
                                    //className="form-control form-control-user"
                                    searchText="Buscando clientes..."
                                    onInputChange={onHandleSearchClientes}
                                    onChange={(value)=>onHandleTypeahead('cliente', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                    <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="origen"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={optionsOrigen}
                                    placeholder="Selecciona el origen..."
                                    selected={selectedOrigen}
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
                                    options={optionsDestino}
                                    placeholder="Selecciona el destino..."
                                    selected={selectedDestino}
                                    //className={"form-control form-control-user"}
                                    searchText="Buscando destino..."
                                    onInputChange={onHandleSearchDestino}
                                    onChange={(value)=>onHandleTypeahead('destino', value)}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={startDate}
                                onChange={handleChangeStartDate}
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
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={startDate}
                                onChange={handleChangeStartDate}
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
                        <div className="form-group">
                            <Typeahead //style={typeheadstyle}
                                    filterBy={(option, props) => {return true;}}
                                    id="linea_transporte"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={optionsLineasTransporte}
                                    placeholder="Selecciona la linea de transporte..."
                                    selected={selectedLineasTransporte}
                                    //className="form-control form-control-user"
                                    searchText="Buscando lineas de transportes..."
                                    onInputChange={onHandleSearchLineasTransporte}
                                    onChange={(value)=>setSelectedLineasTransporte(value)}
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="operador"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={optionsOperador}
                                    placeholder="Selecciona el operador..."
                                    selected={selectedOperador}
                                    //className="form-control form-control-user"
                                    searchText="Buscando operadores..."
                                    onInputChange={onHandleSearchOperador}
                                    onChange={(value)=>setSelectedOperador(value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="camion"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={optionsCamion}
                                    placeholder="Selecciona el camion..."
                                    selected={selectedCamion}
                                    //className="form-control form-control-user"
                                    searchText="Buscando camiones..."
                                    onInputChange={onHandleSearchCamion}
                                    onChange={(value)=>setSelectedCamion(value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="caja"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={optionsCaja}
                                    placeholder="Selecciona el caja..."
                                    selected={selectedCaja}
                                    //className="form-control form-control-user"
                                    searchText="Buscando cajas..."
                                    onInputChange={onHandleSearchCaja}
                                    onChange={(value)=>setSelectedCaja(value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                        <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="gps"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={optionsEquipoGps}
                                    placeholder="Selecciona el equipo Gps..."
                                    selected={selectedEquipoGps}
                                    //className="form-control form-control-user"
                                    searchText="Buscando equipo Gps..."
                                    onInputChange={onHandleSearchEquipoGps}
                                    onChange={(value)=>setSelectedEquipoGps(value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/users" >Cancelar</Link>
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <button type="submit" className="btn btn-success btn-user btn-block">
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

export default EventoCreate;