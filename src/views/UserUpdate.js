import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../common/Layout';
import useForm from '../hooks/useForm';
import Input from '../common/Input';

const GET_USER = gql`
    query getUser($id:ID!){
        getSingleUser(id:$id){
            nombre
            apellido_paterno
            apellido_materno
            email
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($id:ID!, $data:UserInputUpdate!){
        updateOneUser(id:$id, data:$data){
            _id
        }
    }
`;

function UserUpdate({ match, history })  {
    const [ updateUser ] = useMutation(UPDATE_USER);

    const { id } = match.params
    const { data, loading } = useQuery(GET_USER, {variables:{id}});

    const catchData = async (inputs) => {
        console.log("Valores de inputs desde catchData:");
        console.log(inputs);
        const { data } = await updateUser({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/users');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData, data);

    console.log("Valores de inputs:");
    console.log(inputs);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Crear un Nuevo Usuario" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Usuario</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange} value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_paterno} className="form-control form-control-user" name="apellido_paterno" placeholder="Apellido Paterno" required={true} />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_materno} className="form-control form-control-user" name="apellido_materno" placeholder="Apellido Materno" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={handleInputChange}  value={inputs.email} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="telefono" placeholder="Telefono" required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/users" >Cancelar</Link>
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

export default UserUpdate;