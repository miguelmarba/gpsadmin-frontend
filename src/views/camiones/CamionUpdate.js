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

const UPDATE_CAMION = gql`
    mutation updateCamion($id:ID!, $data:CamionInputUpdate!){
        updateOneCamion(id:$id, data:$data){
            _id
        }
    }
`;

function CamionUpdate({ match, history })  {
    const [ updateCamion ] = useMutation(UPDATE_CAMION);
    const { id } = match.params
    const { data, loading } = useQuery(GET_CAMION, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateCamion({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/camiones');
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
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Camión</h1>
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
                            <input type="text" onChange={handleInputChange}  value={inputs.modelo} className="form-control form-control-user" name="modelo" placeholder="Modelo" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.color} className="form-control form-control-user" name="color" placeholder="color" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.cuenta_espejo} className="form-control form-control-user" name="cuenta_espejo" placeholder="Cuenta Espejo" required={false} />
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

export default authHOC(CamionUpdate);