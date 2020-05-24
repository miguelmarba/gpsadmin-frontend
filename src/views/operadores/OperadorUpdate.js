import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormOperador';

const GET_OPERADOR = gql`
    query getOperador($id:ID!){
        getSingleOperador(id:$id){
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
            celular
        }
    }
`;

const UPDATE_OPERADOR = gql`
    mutation updateOperador($id:ID!, $data:OperadorInputUpdate!){
        updateOneOperador(id:$id, data:$data){
            _id
        }
    }
`;

function LineaTransporteUpdate({ match, history })  {
    const [ updateOperador ] = useMutation(UPDATE_OPERADOR);

    const { id } = match.params
    const { data, loading } = useQuery(GET_OPERADOR, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateOperador({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/operadores');
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
    <Layout title="Actualiza Operador" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Operador</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.apellido_paterno} className="form-control form-control-user" name="apellido_paterno" placeholder="Apellido paterno" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.apellido_materno} className="form-control form-control-user" name="apellido_materno" placeholder="Apellido materno" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.email} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="telefono" placeholder="Teléfono" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.celular} className="form-control form-control-user" name="celular" placeholder="Celular" required={false} />
                        </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/operadores" >Cancelar</Link>
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

export default LineaTransporteUpdate;