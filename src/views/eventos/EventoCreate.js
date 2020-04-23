import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useForm';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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

const typeheadstyle = {
    "font-size": '0.8rem',
    "border-radius": '10rem',
    padding: '1.5rem 1rem',
}

const typeheadstyle2 = {
    padding: '0 0',
    border: '0 !important'
}

function EventoCreate({history})  {
    const [ getUsers ] = useMutation(ALL_USERS);
    const [ getClientes ] = useMutation(ALL_CLIENTES);
    const [ getLineasTransporte ] = useMutation(GET_LINEAS_TRANSPORTE);
    const [ sendUser ] = useMutation(CREATE_USER);
    const [optionsCliente, setOptionsCliente] = useState([]);
    const [optionsOrigen, setOptionsOrigen] = useState([]);
    const [optionsDestino, setOptionsDestino] = useState([]);
    const [optionsLineasTransporte, setOptionsLineasTransporte] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState([]);
    const [selectedOrigen, setSelectedOrigen] = useState([]);
    const [selectedDestino, setSelectedDestino] = useState([]);
    const [selectedLineasTransporte, setSelectedLineasTransporte] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

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
            const { data } = await getUsers({variables:{query}});
            console.log("Resultado onHandleSearch:");
            console.log(data);
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getUsers){
                    const searchResults = data.getUsers.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                        apellido_paterno : i.apellido_paterno,
                        apellido_materno : i.apellido_materno
                    }));
                    setOptionsOrigen(searchResults);
                }
            }
        }
    };

    const onHandleSearchDestino = async (query) => {
        if(query.length >= 5){
            setOptionsDestino([]);
            const { data } = await getUsers({variables:{query}});
            console.log("Resultado onHandleSearch:");
            console.log(data);
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getUsers){
                    const searchResults = data.getUsers.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                        apellido_paterno : i.apellido_paterno,
                        apellido_materno : i.apellido_materno
                    }));
                    setOptionsDestino(searchResults);
                }
            }
        }
    };

    const handleChangeStartDate = (date) =>{
        setStartDate(date);
    };

    const catchData = async (inputs) => {
        const { data, errors } = await sendUser({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el usuario");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/users');
        }
    };
    const multiple = false;

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

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
                                    onChange={(value)=>setSelectedCliente(value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                    <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="orig"
                                    labelKey="apellido_paterno"
                                    multiple={multiple}
                                    options={optionsOrigen}
                                    placeholder="Selecciona el origen..."
                                    selected={selectedOrigen}
                                    //className="form-control form-control-user"
                                    searchText="Buscando origen..."
                                    onInputChange={onHandleSearchOrigen}
                                    onChange={(value)=>setSelectedOrigen(value)}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <Typeahead 
                                    filterBy={(option, props) => {return true;}}
                                    id="destin"
                                    labelKey="apellido_materno"
                                    multiple={multiple}
                                    options={optionsDestino}
                                    placeholder="Selecciona el destino..."
                                    selected={selectedDestino}
                                    //className={"form-control form-control-user"}
                                    searchText="Buscando destino..."
                                    onInputChange={onHandleSearchDestino}
                                    onChange={(value)=>setSelectedDestino(value)}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={startDate}
                                onChange={handleChangeStartDate}
                                name="fecha_salida"
                                dateFormat="d/MM/yyyy"
                                />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" onChange={handleInputChange} value={inputs.destino} className="form-control form-control-user" name="destino" placeholder="Destino" />
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
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="operador" placeholder="Operador" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="camion" placeholder="Camión" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="caja" placeholder="Caja" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="gps" placeholder="GPS" required={true} />
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