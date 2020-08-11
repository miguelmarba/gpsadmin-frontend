import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCaja';
import authHOC from '../../utils/authHOC';

const GET_CAJA = gql`
    query getCaja($id:ID!){
        getSingleCaja(id:$id){
            descripcion
            placas
            placas_americanas
        }
    }
`;

const DELETE_CAJA = gql`
    mutation deleteCaja($id:ID!){
        deleteOneCaja(id:$id){
            _id
        }
    }
`;

function CajaUpdate({ match, history })  {
    const [ deleteCaja ] = useMutation(DELETE_CAJA);
    const { id } = match.params
    const { data, loading } = useQuery(GET_CAJA, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await deleteCaja({variables:{id:match.params.id}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/cajas";
        }
    };

    const {
        inputs,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Actualiza Caja" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Eliminar Caja</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        <p>Estas seguro de eliminar la caja <b>{inputs.descripcion?inputs.descripcion:''}</b></p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/cajas" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="deleteCaja" className="btn btn-success btn-user btn-block">
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

export default authHOC(CajaUpdate);