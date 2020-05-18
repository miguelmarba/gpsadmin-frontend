import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import moment from 'moment';
import ClientePreview from '../../components/ClientePreview';
import UbicacionPreview from '../../components/UbicacionPreview';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            }
            linea_transporte{
                _id
                nombre
            }
            operador{
                _id
                nombre
                apellido_paterno
                apellido_materno
            }
            camion{
                _id
                descripcion
            }
            caja{
                _id
                descripcion
            }
            equipo_gps{
                _id
                descripcion
            },
            status_ruta{
                _id
                nombre
                color
            },
            user{
                _id
                nombre
            }
        }
    }
`;

function EventoDetail({ match, history }) {
    const [showDetail, setShowDetail] = useState(true);
    const [showPreviewCliente, setShowPreviewCliente] = useState(false);
    const [showPreviewOrigen, setShowPreviewOrigen] = useState(false);
    const [showPreviewDestino, setShowPreviewDestino] = useState(false);
    const { id } = match.params
    const { data, loading, error } = useQuery(GET_RUTA, {variables:{id}});
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

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
                                        <Link className="btn btn-secondary btn-user btn-block" to={"/eventos/update/" + data.getSingleRuta._id} >Modificar</Link>
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
                                        <button type="button" className="btn btn-secondary btn-user btn-block">
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
                                            {data.getSingleRuta.cliente?data.getSingleRuta.cliente.nombre:''}
                                        </a>
                                    </td>
                                    <th>Fecha salida</th>
                                    <td>{data.getSingleRuta.fecha_salida?moment(data.getSingleRuta.fecha_salida).format('DD MMMM YYYY h:mm'):'Sin Fecha'}</td>
                                </tr>
                                <tr>
                                    <th>Origen</th>
                                    <td>
                                        <a onClick={onHandleClickOrigenPreview} href="#onHandleClickOrigenPreview">
                                            {data.getSingleRuta.origen?data.getSingleRuta.origen.nombre:''}
                                        </a>
                                    </td>
                                    <th>Fecha cita</th>
                                    <td>{data.getSingleRuta.fecha_cita?moment(data.getSingleRuta.fecha_cita).format('DD MMMM YYYY h:mm'):''}</td>
                                </tr>
                                <tr>
                                    <th>Destino</th>
                                    <td>
                                        <a onClick={onHandleClickDestinoPreview} href="#onHandleClickOrigenPreview">
                                            {data.getSingleRuta.destino?data.getSingleRuta.destino.nombre:''}
                                        </a>
                                    </td>
                                    <th>Status</th>
                                    <td><p style={{background: data.getSingleRuta.status_ruta?data.getSingleRuta.status_ruta.color?data.getSingleRuta.status_ruta.color:'':''}}>
                                        {data.getSingleRuta.status_ruta?data.getSingleRuta.status_ruta.nombre:''}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Línea de Transporte</th>
                                    <td>{data.getSingleRuta.linea_transporte?data.getSingleRuta.linea_transporte.nombre:''}</td>
                                    <th>Tipo de Servicio</th>
                                    <td>{data.getSingleRuta.tipo_servicio?data.getSingleRuta.tipo_servicio:''}</td>
                                </tr>
                                <tr>
                                    <th>Operador</th>
                                    <td>{data.getSingleRuta.operador?data.getSingleRuta.operador.nombre:''}</td>
                                    <th>Tipo de Monitoreo</th>
                                    <td>{data.getSingleRuta.tipo_monitoreo?data.getSingleRuta.tipo_monitoreo:''}</td>
                                </tr>
                                <tr>
                                    <th>Operador</th>
                                    <td>{data.getSingleRuta.camion?data.getSingleRuta.camion.nombre:''}</td>
                                    <th>Fecha llegada</th>
                                    <td>{data.getSingleRuta.fecha_llegada?data.getSingleRuta.fecha_llegada:''}</td>
                                </tr>
                                <tr>
                                    <th>Caja</th>
                                    <td>{data.getSingleRuta.caja?data.getSingleRuta.caja.nombre:''}</td>
                                    <th>Folio</th>
                                    <td>{data.getSingleRuta.folio?data.getSingleRuta.folio:''}</td>
                                </tr>
                                <tr>
                                    <th>Equipo GPS</th>
                                    <td>{data.getSingleRuta.equipo_gps?data.getSingleRuta.equipo_gps.nombre:''}</td>
                                    <th>Creado por:</th>
                                    <td>{data.getSingleRuta.user?data.getSingleRuta.user.nombre:''}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row" + (showPreviewCliente?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <ClientePreview cliente={data.getSingleRuta.cliente} />
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
            <div className={"row" + (showPreviewOrigen?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <UbicacionPreview ubicacion={data.getSingleRuta.origen} nombre="Origen" />
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
            <div className={"row" + (showPreviewDestino?"":" d-none")} >
                <div className="col-lg-12 col-md-10 mx-auto">
                    <UbicacionPreview ubicacion={data.getSingleRuta.destino} nombre="Destino" />
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
        </Layout>
        </>
    );
}

export default EventoDetail;