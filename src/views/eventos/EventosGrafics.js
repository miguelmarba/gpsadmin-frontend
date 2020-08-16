import React, { useState } from 'react';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import { useQuery, useMutation } from 'react-apollo-hooks';
import moment from 'moment';
import authHOC from '../../utils/authHOC';
import DatePicker from 'react-datepicker';
import PieChartTiposCamion from './PieChartTiposCamion';
import PieChartStatusRuta from './PieChartStatusRuta';
import PieChartClientes from './PieChartClientes';
import RandomColor from 'randomcolor';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ALL_RUTAS_BY_DATES =  gql`
    query getRutasByDate($begin: String!, $end: String!){
        getSearchRutasByDates(begin: $begin, end: $end){
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
            nombre
            descripcion
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

function Eventos({ history }) {
    const [ getRutasByDates ] = useMutation(ALL_RUTAS_BY_DATES);
    const [ status, setStatus ] = useState('');
    const [ dateIni, setDateIni ] = useState(new Date());
    const [ dateEnd, setDateEnd ] = useState(new Date());
    const [ cargando, setCargando ] = useState(false);
    // let [ rutas, setRutas ] = useState([]);
    let [ data_grafics_status, setDataGraficsStatus ] = useState([]);
    let [ data_grafics_clientes, setDataGraficsClientes ] = useState([]);
    //const {data, loading, error} = useQuery(ALL_RUTAS);
    let { data: statusRuta } = useQuery(ALL_STATUS_RUTA);

    let my_color = [];

    // if(loading) return <h2>Cargando...</h2>
    // if(error) return <h2>Hubo un error :(</h2>

    const onHandleSearchRutas = async () => {
        const begin = moment(dateIni).format('YYYY-MM-DD');
        const end = moment(dateEnd).format('YYYY-MM-DD');
        console.log("==Params onHandleSearchRutas:");
        console.log(status);
        console.log(begin);
        console.log(end);
        // setRutas([]);
        setCargando(true);
        const { data, loading } = await getRutasByDates({variables:{status, begin, end}});
        
        if(loading){
            setCargando(true);
        } else {
            setCargando(false);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            if(data.getSearchRutasByDates){
                setDataGraficsStatus([]);
                setDataGraficsClientes([]);
                data.getSearchRutasByDates.forEach(function (ruta) {
                    if(ruta.status_ruta){
                        const un_status = {
                            title: ruta.status_ruta.nombre,
                            value: 1,
                            color: ruta.status_ruta.color
                        };
                        const un_cliente = {
                            title: ruta.cliente.nombre,
                            value: 1,
                            color: ''
                        };
                        // LLenado de status grafics
                        let existe = 0;
                        let indice = 0;
                        data_grafics_status.forEach(function (currentValue, index, mi_array) {
                            if(ruta.status_ruta.nombre === currentValue.title){
                                existe = 1;
                                indice = index;
                            }
                        });
                        if(existe === 1){
                            data_grafics_status[indice].value++;
                        } else {
                            data_grafics_status.push(un_status);
                        }
                        // LLenado de clientes grafics
                        let existe_cli = 0;
                        let indice_cli = 0;
                        data_grafics_clientes.forEach(function (currentCliente, index) {
                            if(ruta.cliente.nombre === currentCliente.title){
                                existe_cli = 1;
                                indice_cli = index;
                            }
                        });
                        if(existe_cli === 1){
                            data_grafics_clientes[indice_cli].value++;
                        } else {
                            data_grafics_clientes.push(un_cliente);
                        }
                    }
                });
                setDataGraficsStatus(data_grafics_status);
                if(data_grafics_clientes.length > 0){
                    my_color = RandomColor({
                        count: data_grafics_clientes.length,
                        luminosity: 'light'
                     });
                    data_grafics_clientes.forEach(function (currentCliente, index) {
                        data_grafics_clientes[index].color = my_color[index];
                    });
                }
                setDataGraficsClientes(data_grafics_clientes);
            }
        }
    };
    
    const onHandleChangeSelect = (event) => {
        const {value} = event.target;
        setStatus(value);
        if(value){
          onHandleSearchRutas();
        }
    }

    const handleClickRefresh = (event) => {
      event.preventDefault();
    //   if(status){
        onHandleSearchRutas();
    //   }
    }

    const data_grafics_camiones = [
        {
            title: "Torton",
            value: 10,
            color: '#E38627'
        },
        {
            title: "3.5 Ton",
            value: 15,
            color: '#C13C37'
        },
        {
            title: "Normal",
            value: 20,
            color: '#6A2135'
        }
    ];

    const handleInputFechaInicio = (date) =>{
        console.log('Fecha handleInputFechaInicio');
        console.log(date);
        setDateIni(date);
    };

    const handleInputFechaFin = (date) =>{
        console.log('Fecha handleInputFechaFin');
        console.log(date);
        setDateEnd(date);
    };

    return (
    <>
    <Layout title="Clientes" >
      <div className="card shadow mb-4">
          <div className="card-header py-3">
              <h3 className="m-0 font-weight-bold text-primary">Dashboard Rutas por Fechas y Status</h3>
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
                    <div className="form-group mb-2">
                        <label className="mb-1 small" style={{padding: '0 5px'}}>De</label>
                        <DatePicker
                            className={"form-control form-control-user"}
                            selected={dateIni?dateIni:new Date()}
                            onChange={handleInputFechaInicio}
                            onLoad={handleInputFechaInicio}
                            name="fecha_inicio"
                            flaceholderText="Fecha de salida"
                            dateFormat="d/MM/yyyy"
                            />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1 small" style={{padding: '0 5px'}}>Hasta</label>
                        <DatePicker
                            className={"form-control form-control-user"}
                            selected={dateEnd?dateEnd:new Date()}
                            onChange={handleInputFechaFin}
                            onLoad={handleInputFechaFin}
                            name="fecha_fin"
                            flaceholderText="Fecha de salida"
                            dateFormat="d/MM/yyyy"
                            />
                    </div>
                    <div className="form-group ml-2 mb-2">
                      <button className="btn btn-info" type="button" onClick={handleClickRefresh} disabled={cargando}>
                          <i className="fas fa-search fa-sm mr-2"></i>Generar ...
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
          </div>
            {/* <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <h1>Un grafico</h1>
                </div>
            </div> */}
             <div className="row">
                <div className="col-lg-4 col-md-10 mx-auto">
                    <h1>Tipos de camión</h1>
                    <PieChartTiposCamion data_grafics_camiones={data_grafics_camiones} ></PieChartTiposCamion>
                </div>
                <div className="col-lg-4 col-md-10 mx-auto">
                    <h1>Status de Rutas</h1>
                    <PieChartStatusRuta data_grafics_status={data_grafics_status} ></PieChartStatusRuta>
                </div>
                <div className="col-lg-4 col-md-10 mx-auto">
                    <h1>Clientes</h1>
                    <PieChartClientes data_grafics_clientes={data_grafics_clientes} ></PieChartClientes>
                </div>
            </div>
      </div>
    </Layout>
    </>
    );
}

export default authHOC(Eventos);