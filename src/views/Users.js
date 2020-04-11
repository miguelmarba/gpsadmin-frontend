import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function Users() {
    const columnDefs = [{
        headerName: "Make", field: "make", sortable: true, filter: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }];

      const rowData = [{
        make: "Toyota", model: "Celica", price: 35000
      }, {
        make: "Ford", model: "Mondeo", price: 32000
      }, {
        make: "Porsche", model: "Boxter", price: 72000
      }];

    return (
    <>
    <Layout title="Usuarios" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Usuarios</h1>
            <Link to="/users/create" className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                    <i className="fas fa-plus fa-sm text-white-50"></i> Crear nuevo usuario
            </Link>
        </div>
        <div className="ag-theme-balham" style={{ height: '500px', width: '600px' }} >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}>
            </AgGridReact>
        </div>
    </Layout>
    </>
    );
}

export default Users;