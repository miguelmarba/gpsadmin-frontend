import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormUbicacion';
import authHOC from '../../utils/authHOC';

const GET_UBICACION = gql`
    query getUbicacion($id:ID!){
        getSingleUbicacion(id:$id){
            nombre
            cp
            calle
            numero_exterior
            numero_interior
            municipio
            estado
            pais
            georeferenciax
            georeferenciay
        }
    }
`;

const DELETE_UBICACION = gql`
    mutation deleteUbicacion($id:ID!){
        deleteOneUbicacion(id:$id)
    }
`;

function UbicacionUpdate({ match, history })  {
    const [ deleteUbicacion ] = useMutation(DELETE_UBICACION);
    const { id } = match.params
    const { data, loading } = useQuery(GET_UBICACION, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteUbicacion({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/ubicaciones";
        }
    };

    const {
        inputs,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Ubicación" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Eliminar Ubicación</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar la ubicación <b>{inputs.nombre?inputs.nombre:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/ubicaciones" >Cancelar</Link>
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

export default authHOC(UbicacionUpdate);