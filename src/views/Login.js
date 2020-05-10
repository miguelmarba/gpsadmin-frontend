import React, { useState } from 'react';
import {useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import LoginLayout from '../common/Login';
import useForm from '../hooks/useForm';

const LOGIN_MUTATION = gql`
    mutation LOGIN($email: EmailAddress!,$password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;

function Login({ history }) {
    const [sendLogin] = useMutation(LOGIN_MUTATION);
    const [error, setError] = useState('');

    const catchData = async (inputs) => {
        try{
            const {data, errors} = await sendLogin({variables: {...inputs}});
            if(data){
                const { login } = data;
                sessionStorage.setItem('idToken', login.token);
                history.push('/');
            }
            if(errors){
                console.log("Hay errores al iniciar session");
                console.log(errors);
            }
        } catch(e){
            setError('Error en usuario y contraseña.');
        }
    }

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);
    return (
    <>
    <LoginLayout >
        <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Bienvenido a Sigueme!</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                            <p className="text-danger">{error}</p>
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" name="email" value={inputs.email || ''} onChange={handleInputChange} required={true} aria-describedby="emailHelp" placeholder="Nombre de usuario..." />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user" name="password" value={inputs.password || ''} onChange={handleInputChange} required={true} placeholder="Contraseña" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox small">
                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                    <label className="custom-control-label" htmlFor="customCheck">Recordarme</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-user btn-block" >
                                Iniciar sesión
                            </button>
                        </form>
                        <hr />
                        <div className="text-center">
                            <a className="small" href="forgot-password.html">Olvidé mi contraseña</a>
                        </div>
                        <div className="text-center">
                            <a className="small" href="register.html">Crear una Cuenta!</a>
                        </div>
                    </div>
            </div>
        </div>
    </LoginLayout>
    </>
    );
}

export default Login;