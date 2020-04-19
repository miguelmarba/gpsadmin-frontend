import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormLineaTransporte';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_LINEA_TRANSPORTE = gql`
    mutation createLineaTransporte($data:LineaTransporteInput!){
        createNewLineaTransporte(data:$data){
            _id
        }
    }
`;

function LineaTransporteCreate({history})  {
    const [ sendLineaTransporte ] = useMutation(CREATE_LINEA_TRANSPORTE);;

    const catchData = async (inputs) => {
        const { data, errors } = await sendLineaTransporte({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar la línea de transporte");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/lineastrasporte');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return (
        <>
        <Layout title="Crear un Nueva Línea de Transporte" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nueva Línea de Transporte</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre Línea de Tranporte" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.contacto} className="form-control form-control-user" name="contacto" placeholder="Nombre del contacto" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.email} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="telefono" placeholder="Teléfono" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.celular} className="form-control form-control-user" name="celular" placeholder="Celular" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.cp} className="form-control form-control-user" name="cp" placeholder="C.P." required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciax} className="form-control form-control-user" name="georeferenciax" placeholder="X" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciay} className="form-control form-control-user" name="georeferenciay" placeholder="Y" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.direccion} className="form-control form-control-user" name="direccion" placeholder="Dirección" required={false} />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/clientes" >Cancelar</Link>
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <button type="submit" className="btn btn-success btn-user btn-block">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
        </>
    );
}

export default LineaTransporteCreate;