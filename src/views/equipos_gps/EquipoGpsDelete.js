import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormEquipoGps';
import authHOC from '../../utils/authHOC';

const GET_EQUIPO_GPS = gql`
    query getEquipoGps($id:ID!){
        getSingleEquipoGps(id:$id){
            descripcion
            marca
            modelo
            identificador
        }
    }
`;

const DELETE_EQUIPO_GPS = gql`
    mutation deleteEquipoGps($id:ID!){
        deleteOneEquipoGps(id:$id)
    }
`;

function EquipoGpsUpdate({ match, history })  {
    const [ deleteEquipoGps ] = useMutation(DELETE_EQUIPO_GPS);
    const { id } = match.params
    const { data, loading } = useQuery(GET_EQUIPO_GPS, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteEquipoGps({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            window.location.href = "/equiposgps";
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
    <Layout title="Actualizar Equipo Gps" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Equipo Gps</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar el equipo gps <b>{inputs.descripcion?inputs.descripcion:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/equiposgps" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteGps" className="btn btn-success btn-user btn-block">
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

export default authHOC(EquipoGpsUpdate);