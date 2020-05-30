import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery } from 'react-apollo-hooks';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const ALL_CAJAS =  gql`
    query getAllCajas{
      getCajas{
            _id
            descripcion
            placas
            placas_americanas
        }
    }
`;

function Cajas({ history }) {
    const {data, loading, error} = useQuery(ALL_CAJAS);
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

    const columnDefs = [{
        headerName: "Descripción", field: "descripcion", sortable: true, filter: true
      }, {
        headerName: "Placas", field: "placas", sortable: true, filter: true
      }, {
        headerName: "Placas Americanas", field: "placas_americanas", sortable: true, filter: true
      },
      {
        headerName: 'Editar',
        field: 'editar',
        width: 100,
        cellRenderer: (params) => {
            var link = document.createElement('a');
            var imageElement = document.createElement("i");
            imageElement.className = "fas fa-edit fa-sm";
            link.appendChild(imageElement);
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                history.push('/cajas/update/' + params.data._id);
            });
            return link;
          }
      },
      {
        headerName: 'Eliminar',
        field: 'eliminar',
        width: 100,
        cellRenderer: (params) => {
            var link = document.createElement('a');
            var imageElement = document.createElement("i");
            imageElement.className = "fas fa-trash fa-sm";
            link.appendChild(imageElement);
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                //history.push('/users/delete/' + params.data._id);
            });
            return link;
          }
      }
    ];

      const rowData = data.getCajas;

    return (
    <>
    <Layout title="Cajas" >
    <div className="row">
        <div className="col-lg-12 col-md-10 mx-auto">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Cajas</h1>
              <Link to="/cajas/create" className="d-block d-sm-inline-block btn btn-sm btn-success shadow-sm">
                      <i className="fas fa-plus fa-sm text-white-50"></i> Crear nueva Caja
              </Link>
          </div>
          <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }} >
              <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}>
              </AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
    </>
    );
}

export default Cajas;