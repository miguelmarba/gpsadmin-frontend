import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCliente';
import Input from '../../common/Input';

const GET_CLIENTE = gql`
    query getCliente($id:ID!){
        getSingleCliente(id:$id){
            nombre
            rfc
            contacto
            email
            telefono
            celular
            cp
            direccion
        }
    }
`;

const UPDATE_CLIENTE = gql`
    mutation updateCliente($id:ID!, $data:ClienteInputUpdate!){
        updateOneCliente(id:$id, data:$data){
            _id
        }
    }
`;

function ClienteUpdate({ match, history })  {
    const [ updateCliente ] = useMutation(UPDATE_CLIENTE);

    const { id } = match.params
    const { data, loading } = useQuery(GET_CLIENTE, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateCliente({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/clientes');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Actualiza Cliente" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Cliente</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre Cliente" required={true} />
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
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/clientes" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="createUser" className="btn btn-success btn-user btn-block">
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
};

export default ClienteUpdate;