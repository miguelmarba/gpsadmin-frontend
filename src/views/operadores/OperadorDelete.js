import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormOperador';
import authHOC from '../../utils/authHOC';

const GET_OPERADOR = gql`
    query getOperador($id:ID!){
        getSingleOperador(id:$id){
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
            celular
        }
    }
`;

const DELETE_OPERADOR = gql`
    mutation deleteOperador($id:ID!){
        deleteOneOperador(id:$id)
    }
`;

function LineaTransporteUpdate({ match, history })  {
    const [ deleteOperador ] = useMutation(DELETE_OPERADOR);
    const { id } = match.params
    const { data, loading } = useQuery(GET_OPERADOR, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteOperador({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/operadores";
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
    <Layout title="Actualiza Operador" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Operador</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar el operador <b>{inputs.nombre?inputs.nombre + ' ' + inputs.apellido_paterno + ' ' + inputs.apellido_materno:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/operadores" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="createUser" className="btn btn-success btn-user btn-block">
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

export default authHOC(LineaTransporteUpdate);