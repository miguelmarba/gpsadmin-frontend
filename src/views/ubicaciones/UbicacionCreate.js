import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormCaja';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CREATE_UBICACION = gql`
    mutation createUbicacion($data:UbicacionInput!){
        createNewUbicacion(data:$data){
            _id
        }
    }
`;

function UbicacionCreate({history})  {
    const [ sendUbicacion ] = useMutation(CREATE_UBICACION);;

    const catchData = async (inputs) => {
        const { data, errors } = await sendUbicacion({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar la ubicación");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/ubicaciones');
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
                <h1 className="h3 mb-0 text-gray-800">Crear Nueva Ubicación</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre} className="form-control form-control-user border-left-danger" name="nombre" placeholder="Nombre" required={true} />
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

export default UbicacionCreate;