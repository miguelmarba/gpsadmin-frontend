import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useForm';
import authHOC from '../../utils/authHOC';

const GET_USER = gql`
    query getUser($id:ID!){
        getSingleUser(id:$id){
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
            rol
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id:ID!){
        deleteOneUser(id:$id)
    }
`;

function UserUpdate({ match, history })  {
    const [ deleteUser ] = useMutation(DELETE_USER);
    const { id } = match.params;
    const { data, loading } = useQuery(GET_USER, {variables:{id}});

    const catchData = async (inputs) => {
        console.log("Valores de inputs desde catchData:");
        console.log(inputs);
        const { data } = await deleteUser({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/users";
        }
    };

    const {
        inputs,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Elimianr Usuario" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Eliminar Usuario</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar la ubicación <b>{inputs.nombre?inputs.nombre + ' ' + inputs.apellido_paterno + ' ' + inputs.apellido_materno:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/users" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteUser" className="btn btn-success btn-user btn-block">
                                Eliminar
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

export default authHOC(UserUpdate);