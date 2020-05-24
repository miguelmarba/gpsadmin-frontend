import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import moment from 'moment';
import TrackingPreview from '../../components/TrackingPreview';
import ClientePreview from '../../components/ClientePreview';
import UbicacionPreview from '../../components/UbicacionPreview';
import LineaTransportePreview from '../../components/LineaTransportePreview';
import OperadorPreview from '../../components/OperadorPreview';
import CamionPreview from '../../components/CamionPreview';
import CajaPreview from '../../components/CajaPreview';
import EquipoGpsPreview from '../../components/EquipoGpsPreview';

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

const GET_RUTA = gql`
    query getRuta($id:ID!){
        getSingleRuta(id:$id){
            _id
            fecha_salida
            fecha_cita
            folio
            fecha_llegada
            tipo_servicio
            tipo_monitoreo
            cliente{
                _id
                nombre
                rfc
                contacto
                email
                telefono
                celular
                cp 
                direccion
            }
            origen{
                _id
                nombre
                cp
                calle
                numero_exterior
                numero_interior
                estado
                municipio
                pais
            }
            destino{
                _id
                nombre
                cp
                calle
                numero_exterior
                numero_interior
                estado
                municipio
                pais
            }
            linea_transporte{
                _id
                nombre
                contacto
                email
                telefono
                celular
                cp
                direccion
            }
            operador{
                _id
                nombre
                apellido_paterno
                apellido_materno
                email
                telefono
                celular
            }
            camion{
                _id
                descripcion
                placas
                modelo
                color
                cuenta_espejo
                tipo_unidad
            }
            caja{
                _id
                descripcion
                placas
                placas_americanas
            }
            equipo_gps{
                _id
                descripcion
                marca
                modelo
                identificador
            },
            status_ruta{
                _id
                nombre
                color
            },
            user{
                _id
                nombre
            },
            tracking{
                _id
                comentarios
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
    }
`;

function EventoDetail({ match, history }) {
    const [showDetail, setShowDetail] = useState(true);
    const [showPreviewTracking, setShowPreviewTracking] = useState(false);
    const [showPreviewCliente, setShowPreviewCliente] = useState(false);
    const [showPreviewOrigen, setShowPreviewOrigen] = useState(false);
    const [showPreviewDestino, setShowPreviewDestino] = useState(false);
    const [showPreviewLineaTransporte, setShowPreviewLineaTransporte] = useState(false);
    const [showPreviewOperador, setShowPreviewOperador] = useState(false);
    const [showPreviewCamion, setShowPreviewCamion] = useState(false);
    const [showPreviewCaja, setShowPreviewCaja] = useState(false);
    const [showPreviewEquipoGps, setShowPreviewEquipoGps] = useState(false);
    const dataRutaTmp = {
        getSingleRuta: {
            _id:0
        } 
    }
    const [dataRuta, setDataRuta] = useState(dataRutaTmp);
    const { id } = match.params;
    const { data, loading, error } = useQuery(GET_RUTA, {variables:{id}});
    
    useEffect(() => {
        if(data) {
            setDataRuta(data);
        }
    }, [data]);

    let { data: statusRuta, loading: loadingStatusRuta } = useQuery(ALL_STATUS_RUTA);
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

    const onHandleClickTracking = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewTracking(true);
    }

    const onHandleClickBackTracking = () => {
        setShowDetail(true);
        setShowPreviewTracking(false);
    }

    const onHandleClickClientePreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewCliente(true);
    }

    const onHandleClickBackCliente = () => {
        setShowDetail(true);
        setShowPreviewCliente(false);
    }

    const onHandleClickOrigenPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewOrigen(true);
    }

    const onHandleClickBackOrigen = () => {
        setShowDetail(true);
        setShowPreviewOrigen(false);
    }

    const onHandleClickDestinoPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewDestino(true);
    }

    const onHandleClickBackDestino = () => {
        setShowDetail(true);
        setShowPreviewDestino(false);
    }

    const onHandleClickLineaTransportePreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewLineaTransporte(true);
    }

    const onHandleClickBackLineaTransporte = () => {
        setShowDetail(true);
        setShowPreviewLineaTransporte(false);
    }

    const onHandleClickOperadorPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewOperador(true);
    }

    const onHandleClickBackOperador = () => {
        setShowDetail(true);
        setShowPreviewOperador(false);
    }

    const onHandleClickCamionPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewCamion(true);
    }

    const onHandleClickBackCamion = () => {
        setShowDetail(true);
        setShowPreviewCamion(false);
    }

    const onHandleClickCajaPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewCaja(true);
    }

    const onHandleClickBackCaja = () => {
        setShowDetail(true);
        setShowPreviewCaja(false);
    }

    const onHandleClickEquipoGpsPreview = (e) => {
        e.preventDefault();
        setShowDetail(false);
        setShowPreviewEquipoGps(true);
    }

    const onHandleClickBackEquipoGps = () => {
        setShowDetail(true);
        setShowPreviewEquipoGps(false);
    }

    const onHandleChangeStatusRuta = (status_ruta) => {
        setDataRuta(state => ({
            getSingleRuta: {
                ...state.getSingleRuta,
                status_ruta: status_ruta
            }
        }));
    }

    return (
        <>
        <Layout title="Crear un Nuevo Usuario" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Detalle de la Ruta</h1>
            </div>
            <div className={"row" + (showDetail?'':' d-none')} >
                <div className="col-lg-12 col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Link className="btn btn-secondary btn-user btn-block" to={"/eventos/update/" + id} >Modificar</Link>
                                    </th>
                                    <td>
                                        <button type="button" className="btn btn-secondary btn-user btn-block">
                                            Eliminar
                                        </button>
                                    </td>
                                    <th>
                                        <button type="button" className="btn btn-secondary btn-user btn-block">
                                            Duplicar
                                        </button>
                                    </th>
                                    <td>
                                        <button type="button" onClick={onHandleClickTracking} className="btn btn-secondary btn-user btn-block">
                                            Tracking
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Cliente</th>
                                    <td>
                                        <a onClick={onHandleClickClientePreview} href="#onHandleClickClientePreview">
                                            {dataRuta.getSingleRuta.cliente?dataRuta.getSingleRuta.cliente.nombre:''}
                                        </a>
                                    </td>
                                    <th>Fecha salida</th>
                                    <td>{dataRuta.getSingleRuta.fecha_salida?moment(dataRuta.getSingleRuta.fecha_salida).format('DD MMMM YYYY h:mm'):'Sin Fecha'}</td>
                                </tr>
                                <tr>
                                    <th>Origen</th>
                                    <td>
                                        <a onClick={onHandleClickOrigenPreview} href="#onHandleClickOrigenPreview">
                                            {dataRuta.getSingleRuta.origen?dataRuta.getSingleRuta.origen.nombre:''}
                                        </a>
                                    </td>
                                    <th>Fecha cita</th>
                                    <td>{dataRuta.getSingleRuta.fecha_cita?moment(dataRuta.getSingleRuta.fecha_cita).format('DD MMMM YYYY h:mm'):''}</td>
                                </tr>
                                <tr>
                                    <th>Destino</th>
                                    <td>
                                        <a onClick={onHandleClickDestinoPreview} href="#onHandleClickOrigenPreview">
                                            {dataRuta.getSingleRuta.destino?dataRuta.getSingleRuta.destino.nombre:''}
                                        </a>
                                    </td>
                                    <th>Status</th>
                                    <td><p style={{background: dataRuta.getSingleRuta.status_ruta?dataRuta.getSingleRuta.status_ruta.color?dataRuta.getSingleRuta.status_ruta.color:'':''}}>
                                        {dataRuta.getSingleRuta.status_ruta?dataRuta.getSingleRuta.status_ruta.nombre:''}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Línea de Transporte</th>
                                    <td>
                                        <a onClick={onHandleClickLineaTransportePreview} href="#onHandleClickLineaTransportePreview">
                                            {dataRuta.getSingleRuta.linea_transporte?dataRuta.getSingleRuta.linea_transporte.nombre:''}
                                        </a>
                                    </td>
                                    <th>Tipo de Servicio</th>
                                    <td>{dataRuta.getSingleRuta.tipo_servicio?dataRuta.getSingleRuta.tipo_servicio:''}</td>
                                </tr>
                                <tr>
                                    <th>Operador</th>
                                    <td>
                                        <a onClick={onHandleClickOperadorPreview} href="#onHandleClickOperadorPreview">
                                            {dataRuta.getSingleRuta.operador?dataRuta.getSingleRuta.operador.nombre:''}
                                        </a>
                                    </td>
                                    <th>Tipo de Monitoreo</th>
                                    <td>{dataRuta.getSingleRuta.tipo_monitoreo?dataRuta.getSingleRuta.tipo_monitoreo:''}</td>
                                </tr>
                                <tr>
                                    <th>Camión</th>
                                    <td>
                                        <a onClick={onHandleClickCamionPreview} href="#onHandleClickCamionPreview">
                                            {dataRuta.getSingleRuta.camion?dataRuta.getSingleRuta.camion.descripcion:''}
                                        </a>
                                    </td>
                                    <th>Fecha llegada</th>
                                    <td>{dataRuta.getSingleRuta.fecha_llegada?dataRuta.getSingleRuta.fecha_llegada:''}</td>
                                </tr>
                                <tr>
                                    <th>Caja</th>
                                    <td>
                                        <a onClick={onHandleClickCajaPreview} href="#onHandleClickCamionPreview">
                                            {dataRuta.getSingleRuta.caja?dataRuta.getSingleRuta.caja.descripcion:''}
                                        </a>
                                    </td>
                                    <th>Folio</th>
                                    <td>{dataRuta.getSingleRuta.folio?dataRuta.getSingleRuta.folio:''}</td>
                                </tr>
                                <tr>
                                    <th>Equipo GPS</th>
                                    <td>
                                        <a onClick={onHandleClickEquipoGpsPreview} href="#onHandleClickEquipoGpsPreview">
                                            {dataRuta.getSingleRuta.equipo_gps?dataRuta.getSingleRuta.equipo_gps.descripcion:''}
                                        </a>
                                    </td>
                                    <th>Creado por:</th>
                                    <td>{dataRuta.getSingleRuta.user?dataRuta.getSingleRuta.user.nombre:''}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row" + (showPreviewTracking?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <TrackingPreview ruta_id={id} tracking={dataRuta.getSingleRuta.tracking} statusRuta={statusRuta} setNewStatus={onHandleChangeStatusRuta} />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackTracking} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { dataRuta.getSingleRuta.cliente ? (
            <div className={"row" + (showPreviewCliente?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <ClientePreview cliente={dataRuta.getSingleRuta.cliente} />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackCliente} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.origen ? (
            <div className={"row" + (showPreviewOrigen?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <UbicacionPreview ubicacion={dataRuta.getSingleRuta.origen} nombre="Origen" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackOrigen} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.destino ? (
            <div className={"row" + (showPreviewDestino?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <UbicacionPreview ubicacion={dataRuta.getSingleRuta.destino} nombre="Destino" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackDestino} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.linea_transporte ? (
            <div className={"row" + (showPreviewLineaTransporte?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <LineaTransportePreview linea={dataRuta.getSingleRuta.linea_transporte} nombre="Línea de Transporte" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackLineaTransporte} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.operador ? (
            <div className={"row" + (showPreviewOperador?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <OperadorPreview operador={dataRuta.getSingleRuta.operador} nombre="Operador" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackOperador} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.camion ? (
            <div className={"row" + (showPreviewCamion?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <CamionPreview camion={dataRuta.getSingleRuta.camion} nombre="Camión" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackCamion} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.caja ? (
            <div className={"row" + (showPreviewCaja?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <CajaPreview caja={dataRuta.getSingleRuta.caja} nombre="Caja" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackCaja} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
            { dataRuta.getSingleRuta.equipo_gps ? (
            <div className={"row" + (showPreviewEquipoGps?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <EquipoGpsPreview equipo_gps={dataRuta.getSingleRuta.equipo_gps} nombre="Equipo Gps" />
                    <div className="row pt-2">
                        <div className="col-lg-12 col-md-6 mx-auto">
                            <div className="form-group row">
                                <div className="col-sm-12 mb-6 mb-sm-0">
                                    <button className="btn btn-secondary btn-user" onClick={onHandleClickBackEquipoGps} >Regresar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (null)}
        </Layout>
        </>
    );
}

export default EventoDetail;