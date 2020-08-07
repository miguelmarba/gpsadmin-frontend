import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import authenticate from '../utils/authenticate';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import moment from 'moment';
import authHOC from '../utils/authHOC';

const ALL_RUTAS_LAST_SEEN =  gql`
    query getAllRutasLastSeen{
      getRutasLastSeenByUser{
        _id
        ruta{
          _id
          cliente{
            _id
            nombre
          },
          destino{
            _id
            nombre
          },
          status_ruta{
            _id
            nombre
          }
        }
        user{
          _id
          nombre
          apellido_paterno
            apellido_materno
            email
        }
        fecha_consulta
      }
    }
`;

function Home({history}) {
    const {isAuthenticated, payload} = authenticate();
    // if(!isAuthenticated){
    //     history.push('/login');
    // }
    let { data: listRutas} = useQuery(ALL_RUTAS_LAST_SEEN);
    
    return (
    <>
    <Layout title="Home" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Bienvenid@ { isAuthenticated ? payload.nombre: ''}</h1>
            <Link to="/eventos/create" className="d-sm-inline-block btn btn-lg btn-success shadow-sm">
                    <i className="fas fa-plus fa-lg text-white-50"></i> Crear nueva ruta
            </Link>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">RUTAS (MES)</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">2,000</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">GANANCIAS (MES)</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000,000</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Incidencias</div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Rutas Pendientes</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-comments fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-lg-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Últimos Eventos Consultados</h6>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <tbody>
                            { listRutas ? (listRutas.getRutasLastSeenByUser.map((row) => (
                            <tr key={row._id}>
                                <td>
                                    <b>Cliente</b>: {row.ruta.cliente?row.ruta.cliente.nombre:''} <b>Destino</b>: {row.ruta.destino?row.ruta.destino.nombre:'No definido'} <b>Status</b>: {row.ruta.status_ruta?row.ruta.status_ruta.nombre:''} <b>Usuario</b>: {row.user.nombre} <b>Fecha consulta</b>: { row.fecha_consulta?moment(row.fecha_consulta).format('DD MMMM YYYY h:mm'):'Sin fecha' }<Link to={"/eventos/detail/" + row.ruta._id}>Ver</Link>
                                </td>
                            </tr>
                            )) ):(null) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    </>
    );
}

export default authHOC(Home);