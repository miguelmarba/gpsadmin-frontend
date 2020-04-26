import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormEquipoGps';
import Input from '../../common/Input';

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

const UPDATE_EQUIPO_GPS = gql`
    mutation updateEquipoGps($id:ID!, $data:EquipoGpsInputUpdate!){
        updateOneEquipoGps(id:$id, data:$data){
            _id
        }
    }
`;

function EquipoGpsUpdate({ match, history })  {
    const [ updateCaja ] = useMutation(UPDATE_EQUIPO_GPS);

    const { id } = match.params
    const { data, loading } = useQuery(GET_EQUIPO_GPS, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateCaja({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/equiposgps');
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
                    <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.descripcion} className="form-control form-control-user" name="descripcion" placeholder="Descripción" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.marca} className="form-control form-control-user" name="marca" placeholder="Marca" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.modelo} className="form-control form-control-user" name="modelo" placeholder="Modelo" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.identificador} className="form-control form-control-user" name="identificador" placeholder="Identificador" required={false} />
                        </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/equiposgps" >Cancelar</Link>
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

export default EquipoGpsUpdate;