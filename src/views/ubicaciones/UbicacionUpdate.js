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

const UPDATE_UBICACION = gql`
    mutation updateUbicacion($id:ID!, $data:UbicacionInputUpdate!){
        updateOneUbicacion(id:$id, data:$data){
            _id
        }
    }
`;

function UbicacionUpdate({ match, history })  {
    const [ updateUbicacion ] = useMutation(UPDATE_UBICACION);
    const { id } = match.params
    const { data, loading } = useQuery(GET_UBICACION, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateUbicacion({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/ubicaciones');
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
    <Layout title="Ubicación Caja" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Ubicación</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.cp} className="form-control form-control-user" name="cp" placeholder="C.P." required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.calle} className="form-control form-control-user" name="calle" placeholder="Calle" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.numero_exterior} className="form-control form-control-user" name="numero_exterior" placeholder="Número Exterior" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.numero_interior} className="form-control form-control-user" name="numero_interior" placeholder="Número Interior" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.estado} className="form-control form-control-user" name="estado" placeholder="Estado" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.municipio} className="form-control form-control-user" name="municipio" placeholder="Municipio" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.pais} className="form-control form-control-user" name="pais" placeholder="Pais" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciax} className="form-control form-control-user" name="georeferenciax" placeholder="Georeferencia X" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciay} className="form-control form-control-user" name="georeferenciay" placeholder="Georeferencia Y" required={false} />
                        </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/ubicaciones" >Cancelar</Link>
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

export default authHOC(UbicacionUpdate);