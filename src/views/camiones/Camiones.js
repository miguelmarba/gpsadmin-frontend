import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../../common/Layout';
import { useQuery } from 'react-apollo-hooks';
import authHOC from '../../utils/authHOC';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const ALL_CAMIONES =  gql`
    query getAllCamiones{
      getCamiones{
            _id
            descripcion
            placas
            modelo
            color
            cuenta_espejo
            tipo_unidad
        }
    }
`;

function Camiones({ history }) {
    const [ gridApi, setGridApi ] = useState(null);
    const {data, loading, error} = useQuery(ALL_CAMIONES);
    if(loading) return <h2>Cargando...</h2>
    if(error) return <h2>Hubo un error :(</h2>

    const onGridReady = params => {
        setGridApi(params.api);
    }

    const columnDefs = [{
        headerName: "Descripción", field: "descripcion", sortable: true, filter: true
      }, {
        headerName: "Placas", field: "placas", sortable: true, filter: true
      }, {
        headerName: "Modelo", field: "modelo", sortable: true, filter: true
      }, {
        headerName: "Color", field: "color", sortable: true, filter: true
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
                history.push('/camiones/update/' + params.data._id);
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
                history.push('/camiones/delete/' + params.data._id);
            });
            return link;
          }
      }
    ];

    const handleClickExport = (event) => {
      event.preventDefault();
      const params = {
        fileName: 'catalogo_camiones.csv',
        columnKeys: ['descripcion', 'placas', 'modelo', 'color'],
      }; 
      gridApi.exportDataAsCsv(params);
    }

    const rowData = data.getCamiones;

    return (
    <>
    <Layout title="Camiones" >
    <div className="row">
        <div className="col-lg-12 col-md-10 mx-auto">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Camiones</h1>
          </div>
          <div className="row">
              <div className="col-xl-6 col-md-6 col-sm-3 mb-2 text-right">
                  <button className="btn btn-sm btn-info shadow-sm d-none d-md-block" type="button" onClick={handleClickExport}>
                    <i className="fas fa-file-csv fa-sm mr-2"></i>Exportar a CSV
                  </button>
                  <button className="btn btn-sm btn-info shadow-sm btn-block d-block d-md-none" type="button" onClick={handleClickExport}>
                    <i className="fas fa-file-csv fa-sm mr-2"></i>Exportar a CSV
                  </button>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-3 mb-2 text-right">
                <Link to="/camiones/create" className="d-block d-sm-inline-block btn btn-sm btn-success shadow-sm">
                  <i className="fas fa-plus fa-sm text-white-50"></i> Crear nuevo Camión
                </Link>
              </div>
          </div>
          <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }} >
              <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  onGridReady={onGridReady} >
              </AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
    </>
    );
}

export default authHOC(Camiones);