import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery, useMutation } from 'react-apollo-hooks';
import moment from 'moment';

const ALL_RUTAS_BY_STATUS =  gql`
    query getAllRutasByStatus($status:ID){
      getSearchRutasByStatus(status:$status){
        _id
        fecha_salida
        fecha_cita
        fecha_llegada
        cliente{
          nombre
          cp
          celular
          rfc
        }
        origen{
          nombre
        }
        destino{
          nombre
        }
        status_ruta{
          color
        }
      }
    }
`;

const ALL_STATUS_RUTA =  gql`
    query getAllStatusRuta{
        getStatusRuta{
            _id
            nombre
        }
    }
`;

const EXPORT_RUTAS_BY_STATUS =  gql`
    query getExportRutasByStatus($status:ID){
      getExcelRutasByStatus(status:$status){
        _id
      }
    }
`;

function Eventos({ history }) {
    const [ getRutasByStatus ] = useMutation(ALL_RUTAS_BY_STATUS);
    const [ getExportRutasByStatus ] = useMutation(EXPORT_RUTAS_BY_STATUS);
    const [ status, setStatus ] = useState('');
    const [ cargando, setCargando ] = useState(false);
    let [ rutas, setRutas ] = useState([]);
    //const {data, loading, error} = useQuery(ALL_RUTAS);
    let { data: statusRuta } = useQuery(ALL_STATUS_RUTA);
    
    useEffect(() => {
      setRutas(rutas);
    }, [rutas]);

    // if(loading) return <h2>Cargando...</h2>
    // if(error) return <h2>Hubo un error :(</h2>

    const onHandleSearchRutas = async (status) => {
      setRutas([]);
      setCargando(true);
      const { data, loading } = await getRutasByStatus({variables:{status}});
      
      if(loading){
        setCargando(true);
      } else {
        setCargando(false);
      }
      if (data) {
        if (data.errors) console.log(data.errors); 
        if(data.getSearchRutasByStatus){
          setRutas(data.getSearchRutasByStatus);
        }
      } else {
        setRutas([]);
      }
    };
    
    const onHandleChangeSelect = (event) => {
        const {value} = event.target;
        setStatus(value);
        if(value){
          onHandleSearchRutas(value);
        }
    }

    const handleClickRefresh = (event) => {
      event.preventDefault();
      if(status){
        onHandleSearchRutas(status);
      }
    }

    const onHandleExcelRutas = async (status) => {
      setCargando(true);
      const { data, loading } = await getExportRutasByStatus({variables:{status}});
      console.log('Resultado data en onHandleExcelRutas');
      console.log(data);
      
      if(loading){
        setCargando(true);
      } else {
        setCargando(false);
      }
      if (data) {
        if (data.errors) console.log(data.errors);
        console.log('Exito en onHandleExcelRutas') 
        
      } else {
        console.log('Errores en onHandleExcelRutas');
      }

    };

    const handleClickExport = (event) => {
      event.preventDefault();
      if(status){
        onHandleExcelRutas(status);
      }
    }

    return (
    <>
    <Layout title="Clientes" >
      <div className="card shadow mb-4">
          <div className="card-header py-3">
              <h3 className="m-0 font-weight-bold text-primary">Lista de Rutas</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12 col-md-10 mx-auto">
                <form className="form-inline">
                    <div className="form-group mb-2">
                        <select name="status_ruta" className="form-control bg-light border-0 small" onChange={onHandleChangeSelect} value={status}>
                            <option value="">-Selecciona el status-</option>
                            { statusRuta ? (statusRuta.getStatusRuta.map((status) => (
                            <option key={status._id} value={status._id}>{status.nombre}</option>
                            )) ):(null) }
                        </select>
                    </div>
                    <div className="form-group ml-2 mb-2">
                      <button className="btn btn-info" type="button" onClick={handleClickRefresh} disabled={cargando}>
                          <i className="fas fa-sync-alt fa-sm mr-2"></i>Refrescar
                      </button>
                    </div>
                    <div className="form-group ml-2 mb-2">
                      <button className="btn btn-info" type="button" onClick={handleClickExport} disabled={cargando}>
                          <i className="fas fa-file-excel fa-sm mr-2"></i>Excel
                      </button>
                    </div>
                </form>
              </div>
            </div>
            <div className={"row " + (cargando?"d-block":"d-none")}>
              <div className="col-lg-12 col-md-10 mx-auto">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Origen</th>
                    <th scope="col">Destino</th>
                    <th scope="col">Fecha Salida</th>
                    <th scope="col">Fecha Cita</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  { rutas ?
                    (rutas.map((ruta) => (
                    <tr key={ruta._id} style={{background: ruta.status_ruta?ruta.status_ruta.color?ruta.status_ruta.color:'':''}}>
                      <td>{ruta.cliente?ruta.cliente.nombre:''}</td>
                      <td>{ruta.origen?ruta.origen.nombre:''}</td>
                      <td>{ruta.destino?ruta.destino.nombre:''}</td>
                      <td>{moment(ruta.fecha_salida).format('DD MMMM YYYY h:mm')}</td>
                      <td>{moment(ruta.fecha_cita).format('DD MMMM YYYY h:mm')}</td>
                      <td>
                      <Link to={"/eventos/detail/" + ruta._id} className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm">
                        <i className="fas fa-edit fa-sm text-white-50"></i> Ver
                      </Link>
                      </td>
                    </tr>
                  ))
                  ): (null) }
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </Layout>
    </>
    );
}

export default Eventos;