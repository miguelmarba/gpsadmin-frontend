import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormStatusRuta';
import { SketchPicker} from 'react-color';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_STATUS_RUTA = gql`
    mutation createStatusRuta($data:StatusRutaInput!){
        createNewStatusRuta(data:$data){
            _id
        }
    }
`;

function CajaCreate({history})  {
    const [ sendStatusRuta ] = useMutation(CREATE_STATUS_RUTA);

    const catchData = async (inputs) => {
        const { data, errors } = await sendStatusRuta({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el status");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/statusruta');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit,
        handleChangeSketchPicker
    } = useForm(catchData);

    return (
        <>
        <Layout title="Crear un Nuevo Status" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Status</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre?inputs.nombre:''} className="form-control form-control-user border-left-danger" name="nombre" placeholder="Nombre" required={true} />
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
                                <button type="submit" className="btn btn-success btn-user btn-block">
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
}

export default CajaCreate;