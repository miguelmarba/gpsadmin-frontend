import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCamion';
import authHOC from '../../utils/authHOC';

const GET_CAMION = gql`
    query getCamion($id:ID!){
        getSingleCamion(id:$id){
            descripcion
            placas
            modelo
            color
            cuenta_espejo
            tipo_unidad
        }
    }
`;

const DELETE_CAMION = gql`
    mutation updateCamion($id:ID!){
        deleteOneCamion(id:$id)
    }
`;

function CamionUpdate({ match, history })  {
    const [ deleteCamion ] = useMutation(DELETE_CAMION);
    const { id } = match.params
    const { data, loading } = useQuery(GET_CAMION, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteCamion({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            window.location.href = "/camiones";
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
    <Layout title="Actualiza Camion" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Eliminar Camión</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar el camión <b>{inputs.descripcion?inputs.descripcion:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/cajas" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteCamion" className="btn btn-success btn-user btn-block">
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

export default authHOC(CamionUpdate);