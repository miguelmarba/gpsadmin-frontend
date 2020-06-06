import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCamion';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_CAMION = gql`
    mutation createCamion($data:CamionInput!){
        createNewCamion(data:$data){
            _id
        }
    }
`;

function CamionCreate({history})  {
    const [ sendCamion ] = useMutation(CREATE_CAMION);;

    const catchData = async (inputs) => {
        const { data, errors } = await sendCamion({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el camión");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/camiones');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return (
        <>
        <Layout title="Crear un Nuevo Camión" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Camión</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.descripcion} className="form-control form-control-user border-left-danger" name="descripcion" placeholder="Descripción" required={true} />
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
                                <Link className="btn btn-secondary btn-user btn-block" to="/camiones" >Cancelar</Link>
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

export default CamionCreate;