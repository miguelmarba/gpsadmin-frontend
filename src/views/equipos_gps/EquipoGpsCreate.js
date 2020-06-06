import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormEquipoGps';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_EQUIPO_GPS = gql`
    mutation createEquipoGps($data:EquipoGpsInput!){
        createNewEquipoGps(data:$data){
            _id
        }
    }
`;

function EquipoGpsCreate({history})  {
    const [ sendEquiposGps ] = useMutation(CREATE_EQUIPO_GPS);;

    const catchData = async (inputs) => {
        const { data, errors } = await sendEquiposGps({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar la EquiposGps");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/equiposgps');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return (
        <>
        <Layout title="Crear un Nueva Caja" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Equipo Gps</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.descripcion} className="form-control form-control-user border-left-danger" name="descripcion" placeholder="Descripción" required={true} />
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

export default EquipoGpsCreate;