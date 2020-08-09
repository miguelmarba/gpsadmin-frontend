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

const UPDATE_STATUS_RUTA = gql`
    mutation updateStatusRuta($id:ID!, $data:StatusRutaInputUpdate!){
        updateOneStatusRuta(id:$id, data:$data){
            _id
        }
    }
`;

function StatusRutaUpdate({ match, history })  {
    const [ updateStatusRuta ] = useMutation(UPDATE_STATUS_RUTA);
    const { id } = match.params
    const { data, loading } = useQuery(GET_STATUS_RUTA, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateStatusRuta({variables:{id:match.params.id, data:{...inputs}}});
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
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Status Ruta</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.nombre?inputs.nombre:''} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.descripcion?inputs.descripcion:''} className="form-control form-control-user" name="descripcion" placeholder="Descripción" required={true} />
                    </div>
                    <div className="form-group">
                        <SketchPicker
                            color={ inputs.color?inputs.color:'#fff' }
                            onChangeComplete={ handleChangeSketchPicker }
                            />
                        </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/statusruta" >Cancelar</Link>
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

export default authHOC(StatusRutaUpdate);