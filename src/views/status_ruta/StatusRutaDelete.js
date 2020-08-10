import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormStatusRuta';
import { SketchPicker} from 'react-color';
import authHOC from '../../utils/authHOC';

const GET_STATUS_RUTA = gql`
    query getStatusRuta($id:ID!){
        getSingleStatusRuta(id:$id){
            nombre
            descripcion
            color
        }
    }
`;

const DELETE_STATUS_RUTA = gql`
    mutation deleteStatusRuta($id:ID!){
        deleteteOneStatusRuta(id:$id)
    }
`;

function StatusRutaUpdate({ match, history })  {
    const [ deleteStatusRuta ] = useMutation(DELETE_STATUS_RUTA);
    const { id } = match.params
    const { data, loading } = useQuery(GET_STATUS_RUTA, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteStatusRuta({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            window.location.href = "/statusruta";
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit,
        handleChangeSketchPicker
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Actualiza Status Ruta" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Eliminar Status Ruta</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar el camión <b>{inputs.nombre?inputs.nombre:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/statusruta" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteStatus" className="btn btn-success btn-user btn-block">
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

export default authHOC(StatusRutaUpdate);