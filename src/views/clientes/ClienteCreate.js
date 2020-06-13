import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCliente';
import authHOC from '../../utils/authHOC';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_CLIENTE = gql`
    mutation createCliente($data:ClienteInput!){
        createNewCliente(data:$data){
            _id
        }
    }
`;

function ClienteCreate({history})  {
    const [ sendCliente ] = useMutation(CREATE_CLIENTE);
    const catchData = async (inputs) => {
        const { data, errors } = await sendCliente({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el cliente");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/clientes');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return (
        <>
        <Layout title="Crear un Nuevo Usuario" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Cliente</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user border-left-danger" name="nombre" placeholder="Nombre Cliente" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.rfc} className="form-control form-control-user" name="rfc" placeholder="RFC" required={true} />
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
                            <input type="text" onChange={handleInputChange}  value={inputs.direccion} className="form-control form-control-user" name="direccion" placeholder="Dirección" required={false} />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-4 mb-2 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/clientes" >Cancelar</Link>
                            </div>
                            <div className="col-sm-4 mb-2 mb-sm-0">
                                <button type="submit" name="guardar" className="btn btn-success btn-user btn-block">
                                    Guardar
                                </button>
                            </div>
                            <div className="col-sm-4 mb-2 mb-sm-0">
                                <button type="submit" name="guardar_nuevo" className="btn btn-success btn-user btn-block">
                                    Guardar y Nuevo
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

export default authHOC(ClienteCreate);