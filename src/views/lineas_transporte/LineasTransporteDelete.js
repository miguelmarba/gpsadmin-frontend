import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormLineaTransporte';
import authHOC from '../../utils/authHOC';

const GET_LINEA_TRANSPORTE = gql`
    query getLineaTransporte($id:ID!){
        getSingleLineaTransporte(id:$id){
            nombre
            contacto
            email
            telefono
            celular
            cp
            direccion
            georeferenciax
            georeferenciay
        }
    }
`;

const DELETE_LINEA_TRANSPORTE = gql`
    mutation deleteLineaTransporte($id:ID!){
        deleteOneLineaTransporte(id:$id)
    }
`;

function LineaTransporteUpdate({ match, history })  {
    const [ deleteLineaTransporte ] = useMutation(DELETE_LINEA_TRANSPORTE);
    const { id } = match.params
    const { data, loading } = useQuery(GET_LINEA_TRANSPORTE, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteLineaTransporte({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/lineastrasporte";
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
            <h1 className="h3 mb-0 text-gray-800">Eliminar Línea de Transporte</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar la línea de transporte <b>{inputs.nombre?inputs.nombre:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/lineastrasporte" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteLineaTransporte" className="btn btn-success btn-user btn-block">
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