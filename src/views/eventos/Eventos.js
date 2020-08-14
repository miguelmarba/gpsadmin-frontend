import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery, useMutation } from 'react-apollo-hooks';
import moment from 'moment';
import authHOC from '../../utils/authHOC';

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ALL_RUTAS_BY_STATUS =  gql`
    query getAllRutasByStatus($status:ID){
      getSearchRutasByStatus(status:$status){
        _id
        fecha_salida
        fecha_cita
        fecha_llegada
        cliente{
          _id
          nombre
          cp
          celular
          rfc
        }
        origen{
          _id
          nombre
        }
        destino{
          _id
          nombre
        }
        status_ruta{
          _id
          nombre
          color
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
        }
        tipo_servicio
        tipo_monitoreo
        folio
        numero_sello_caja
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

// const EXPORT_RUTAS_BY_STATUS =  gql`
//     query getExportRutasByStatus($status:ID){
//       getExcelRutasByStatus(status:$status)
//     }
// `;

function Eventos({ history }) {
    const [ getRutasByStatus ] = useMutation(ALL_RUTAS_BY_STATUS);
    // const [ getExportRutasByStatus ] = useMutation(EXPORT_RUTAS_BY_STATUS);
    const [ status, setStatus ] = useState('');
    const [ cargando, setCargando ] = useState(false);
    let [ rutas, setRutas ] = useState([]);
    let [ rutas_exportar, setRutasExportar ] = useState([]);
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
          setRutasExportar([]);
          let rutas_armados = [];

          data.getSearchRutasByStatus.forEach(function (ruta) {
            console.log("== Rsultado de forEach");
            console.log(ruta);
            const una_ruta = {
              nombre_cliente: ruta.cliente?ruta.cliente.nombre:'',
              ruta_origen: ruta.origen?ruta.origen.nombre:'',
              ruta_destino: ruta.destino?ruta.destino.nombre:'',
              fecha_salida: ruta.fecha_salida?moment(ruta.fecha_salida).format('DD MMMM YYYY h:mm'):'',
              fecha_cita: ruta.fecha_cita?moment(ruta.fecha_cita).format('DD MMMM YYYY h:mm'):'',
              fecha_llegada: ruta.fecha_llegada?moment(ruta.fecha_llegada).format('DD MMMM YYYY h:mm'):'',
              status_ruta: ruta.status_ruta?ruta.status_ruta.nombre:'',
              linea_transporte: ruta.linea_transporte?ruta.linea_transporte.nombre:'',
              operador: ruta.operador?ruta.operador.nombre + " " + ruta.operador.apellido_paterno  + " " + ruta.operador.apellido_materno:'',
              camion: ruta.camion?ruta.camion.descripcion:'',
              caja: ruta.caja?ruta.caja.descripcion:'',
              equipo_gps: ruta.equipo_gps?ruta.equipo_gps.descripcion:'',
              tipo_servicio: ruta.tipo_servicio?ruta.tipo_servicio:'',
              tipo_monitoreo: ruta.tipo_monitoreo?ruta.tipo_monitoreo:'',
              folio: ruta.folio?ruta.folio:'',
              numero_sello_caja: ruta.numero_sello_caja?ruta.numero_sello_caja:''
            };
            console.log("== Rsultado de una_ruta");
            console.log(una_ruta);
            rutas_armados.push(una_ruta);
          });
          console.log("== Rsultado de rutas_armados");
          console.log(rutas_armados);
          setRutasExportar(rutas_armados);
          console.log("== Rsultado de rutas_exportar");
          console.log(rutas_exportar);
          
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

    // const onHandleExcelRutas = async (status) => {
    //   setCargando(true);
    //   const { data, loading } = await getExportRutasByStatus({variables:{status}});
    //   console.log('Resultado data en onHandleExcelRutas');
    //   console.log(data);
      
    //   if(loading){
    //     setCargando(true);
    //   } else {
    //     setCargando(false);
    //   }
    //   if (data.getExcelRutasByStatus) {
    //     if (data.errors) console.log(data.errors);
    //     console.log('Exito en onHandleExcelRutas'); 
    //     const file_name = data.getExcelRutasByStatus.file_name;
    //     const file_str = data.getExcelRutasByStatus.file;
    //     console.log(file_name); 
    //     console.log(file_str); 
    //   } else {
    //     console.log('Errores en onHandleExcelRutas');
    //   }
      

    // };

    // const handleClickExport = (event) => {
    //   event.preventDefault();
    //   if(status){
    //     onHandleExcelRutas(status);
    //   }
    // }

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
                      {/* <button className="btn btn-success" type="button" onClick={handleClickExport} disabled={cargando}>
                          <i className="fas fa-file-excel fa-sm mr-2"></i>Excel
                      </button> */}
                      <ExcelFile filename="reporte_rutas_por_status" element={<button className={"btn btn-success " + (rutas_exportar.length > 1?"":"d-none")}>Exportar a Excel</button>}>
                        <ExcelSheet data={rutas_exportar} name="Rutas por Estatus">
                            <ExcelColumn label="Nombre Cliente" value="nombre_cliente"/>
                            <ExcelColumn label="Ruta Origen" value="ruta_origen"/>
                            <ExcelColumn label="Ruta Destino" value="ruta_destino"/>
                            <ExcelColumn label="Fecha Salida" value="fecha_salida"/>
                            <ExcelColumn label="Fecha Cita" value="fecha_cita"/>
                            <ExcelColumn label="Fecha Llegada" value="fecha_llegada"/>
                            <ExcelColumn label="Líneas de Transporte" value="linea_transporte"/>
                            <ExcelColumn label="Operador" value="operador"/>
                            <ExcelColumn label="Camión" value="camion"/>
                            <ExcelColumn label="Caja" value="caja"/>
                            <ExcelColumn label="Equipo_gps" value="equipo_gps"/>
                            <ExcelColumn label="Tipo de Servicio" value="tipo_servicio"/>
                            <ExcelColumn label="Tipo de Monitoreo" value="tipo_monitoreo"/>
                            <ExcelColumn label="Folio" value="folio"/>
                            <ExcelColumn label="Número Sello Caja" value="numero_sello_caja"/>
                        </ExcelSheet>
                      </ExcelFile>
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

export default authHOC(Eventos);