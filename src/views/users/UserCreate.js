import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import useForm from '../../hooks/useForm';
import Layout from '../../common/Layout';
import authHOC from '../../utils/authHOC';

const CREATE_USER = gql`
    mutation createUser($data:UserInput!){
        createNewUser(data:$data){
            _id
        }
    }
`;

function UserCreate({history})  {
    const [ sendUser ] = useMutation(CREATE_USER);
    const [cover, setCover] = useState('');
    const [coverPreview, setCoverPreview] = useState('');
    
    const catchCover = event =>{
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const catchData = async (inputs) => {
        const { data, errors } = await sendUser({variables:{data:{...inputs}}});
        if(errors) {
            console.log("HAY errores al guardar el usuario");
            console.log(errors);
        }
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/users');
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData);

    return (
    <>
    <Layout title="Crear un Nuevo Usuario" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Crear Nuevo Usuario</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange} value={inputs.nombre} className="form-control form-control-user" name="nombre" placeholder="Nombre" required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_paterno} className="form-control form-control-user" name="apellido_paterno" placeholder="Apellido Paterno" required={true} />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" onChange={handleInputChange} value={inputs.apellido_materno} className="form-control form-control-user" name="apellido_materno" placeholder="Apellido Materno" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={handleInputChange}  value={inputs.email} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleInputChange}  value={inputs.telefono} className="form-control form-control-user" name="telefono" placeholder="Telefono" required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/users" >Cancelar</Link>
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

export default authHOC(UserCreate);