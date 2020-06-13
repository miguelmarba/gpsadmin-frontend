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

const UPDATE_CAJA = gql`
    mutation updateCaja($id:ID!, $data:CajaInputUpdate!){
        updateOneCaja(id:$id, data:$data){
            _id
        }
    }
`;

function CajaUpdate({ match, history })  {
    const [ updateCaja ] = useMutation(UPDATE_CAJA);
    const { id } = match.params
    const { data, loading } = useQuery(GET_CAJA, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateCaja({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/cajas');
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
    <Layout title="Actualiza Caja" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Caja</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.descripcion} className="form-control form-control-user" name="descripcion" placeholder="Descripción" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.placas} className="form-control form-control-user" name="placas" placeholder="Placas" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.placas_americanas} className="form-control form-control-user" name="placas_americanas" placeholder="Placas Americanas" required={false} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/cajas" >Cancelar</Link>
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

export default authHOC(CajaUpdate);