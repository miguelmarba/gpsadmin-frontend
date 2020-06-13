import { useState, useEffect } from 'react';

function useForm(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleUser){
            delete current.getSingleUser.__typename;
            setInputs({...current.getSingleUser});
        }
        if(current.getSingleUserByEmail){
            delete current.getSingleUserByEmail.__typename;
            delete current.getSingleUserByEmail._id;
            setInputs({...current.getSingleUserByEmail});
        }
    },[current]);
    
    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target;
        setInputs(fields => ({...fields, [name]: value}));
    };

    const handleSubmit = event => {
        if(event) event.preventDefault();
        callback(inputs);
    };

    const handleInput  = (name, value) => {
        setInputs(fields => ({...fields, [name]: value}));
    };

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        handleInput
    }
};

export default useForm;