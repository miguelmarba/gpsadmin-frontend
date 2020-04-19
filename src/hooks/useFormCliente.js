import { useState, useEffect } from 'react';

function useFormCliente(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleCliente){
            delete current.getSingleCliente.__typename;
            setInputs({...current.getSingleCliente});
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

    return {
        inputs,
        handleInputChange,
        handleSubmit
    }
};

export default useFormCliente;