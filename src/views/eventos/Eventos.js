import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery } from 'react-apollo-hooks';
import moment from 'moment';

const ALL_RUTAS =  gql`
    query getAllRutas{
      getRutas{
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
      }
    }
`;

function Eventos({ history }) {
    const {data, loading, error} = useQuery(ALL_RUTAS);
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

    return (
    <>
    <Layout title="Clientes" >
      <div className="card shadow mb-4">
          <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Rutas activas</h6>
          </div>
          <div className="card-body">
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
              {
                data.getRutas.map((ruta) => (
                <tr key={ruta._id}>
                  <td>{ruta.cliente.nombre}</td>
                  <td>{ruta.origen.nombre}</td>
                  <td>{ruta.destino.nombre}</td>
                  <td>{moment(ruta.fecha_salida).format('DD MMMM YYYY h:mm')}</td>
                  <td>{moment(ruta.fecha_cita).format('DD MMMM YYYY h:mm')}</td>
                  <td>ver</td>
                </tr>
              ))
              }
            </tbody>
          </table>
          </div>
      </div>
    </Layout>
    </>
    );
}

export default Eventos;