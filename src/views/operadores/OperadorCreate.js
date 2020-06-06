import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormOperador';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_OPERADOR = gql`
    mutation createOperador($data:OperadorInput!){
        createNewOperador(data:$data){
            _id
        }
    }
`;

function OperadorCreate({history})  {
    const [ sendOperador ] = useMutation(CREATE_OPERADOR);;

    const catchData = async (inputs) => {
        const { data, errors } = await sendOperador({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el operador");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/operadores');
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
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Operador</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user border-left-danger" name="nombre" placeholder="Nombre" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.apellido_paterno} className="form-control form-control-user" name="apellido_paterno" placeholder="Apellido paterno" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.apellido_materno} className="form-control form-control-user" name="apellido_materno" placeholder="Apellido materno" required={true} />
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
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/operadores" >Cancelar</Link>
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

export default OperadorCreate;