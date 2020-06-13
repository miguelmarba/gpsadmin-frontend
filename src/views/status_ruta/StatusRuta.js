import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery } from 'react-apollo-hooks';
import authHOC from '../../utils/authHOC';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const ALL_STATUS_RUTA =  gql`
    query getAllStatusRuta{
      getStatusRuta{
            _id
            nombre
            descripcion
            color
        }
    }
`;

function Cajas({ history }) {
    const {data, loading, error} = useQuery(ALL_STATUS_RUTA);
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

    const columnDefs = [{
        headerName: "Nombre", field: "nombre", sortable: true, filter: true
      }, {
        headerName: "Descripción", field: "descripcion", sortable: true, filter: true, width: 600
      },
      {
        headerName: 'Color',
        field: 'color',
        width: 100,
        cellRenderer: (params) => {
            var parraf = document.createElement('p');
            parraf.innerText = '' + params.data.color?params.data.color:'';
            parraf.style.color = '#000';
            parraf.style.background = '' + params.data.color?params.data.color:'';
            return parraf;
          }
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
                history.push('/statusruta/update/' + params.data._id);
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

      const rowData = data.getStatusRuta;

    return (
    <>
    <Layout title="Cajas" >
    <div className="row">
        <div className="col-lg-12 col-md-10 mx-auto">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Status Ruta</h1>
              <Link to="/statusruta/create" className="d-block d-sm-inline-block btn btn-sm btn-success shadow-sm">
                      <i className="fas fa-plus fa-sm text-white-50"></i> Crear nuevo Status
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

export default authHOC(Cajas);