import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useForm';
import authenticate from '../../utils/authenticate';


const GET_PROFILE =  gql`
    query getUserByEmail($email:EmailAddress!){
        getSingleUserByEmail(email:$email){
            _id
            email
            nombre
            apellido_paterno
            apellido_materno
            telefono
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser($id:ID!, $data:UserInputUpdate!){
        updateOneUser(id:$id, data:$data){
            _id
        }
    }
`;

function Settings({ match, history })  {
    const [ userId, setUserId ] = useState(0);
    const {isAuthenticated, payload} = authenticate();
    if(!isAuthenticated){
        history.push('/');
    }

    const { data, loading, error } = useQuery(GET_PROFILE, {variables:{email: payload.email}});
    const [ updateUser ] = useMutation(UPDATE_USER);
    const [ passEqual, setPassEqual ] = useState(true);
    
    useEffect(() => {
        if(data){
            setUserId(data.getSingleUserByEmail._id);
        }
    }, [data]);

    const catchData = async (inputs) => {
        if(inputs.password === inputs.confirm_password){
            const { data } = await updateUser({variables:{id:userId, data:{...inputs}}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                history.push('/profile');
            }
        } else {
            setPassEqual(false);
        }
    };

    const handleKeyUp = () =>{
        setPassEqual(true);
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Crear un Nuevo Usuario" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Configuración</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange} value={inputs.nombre?inputs.nombre:''} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_paterno?inputs.apellido_paterno:''} className="form-control form-control-user" name="apellido_paterno" placeholder="Apellido Paterno" required={true} />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_materno?inputs.apellido_materno:''} className="form-control form-control-user" name="apellido_materno" placeholder="Apellido Materno" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={handleInputChange}  value={inputs.email?inputs.email:''} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.telefono?inputs.telefono:''} className="form-control form-control-user" name="telefono" placeholder="Telefono" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="password" onKeyUp={handleKeyUp} onChange={handleInputChange}  value={inputs.password?inputs.password:''} className={"form-control form-control-user" + (passEqual?'':' border-left-danger')} name="password" placeholder="Nueva contraseña" required={false} />
                    </div>
                    <div className="form-group">
                        <input type="password" onKeyUp={handleKeyUp} onChange={handleInputChange}  value={inputs.confirm_password?inputs.confirm_password:''} className={"form-control form-control-user" + (passEqual?'':' border-left-danger')} name="confirm_password" placeholder="Confirmar Nueva contraseña" required={false} />
                    </div>
                    <div className={"alert alert-danger" + (passEqual?' d-none':'')} role="alert">
                        <p className="text-danger">Las contraseñas no coinciden</p>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/profile" >Cancelar</Link>
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

export default Settings;