import { useState, useEffect } from 'react';

function useFormLineaTransporte(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleLineaTransporte){
            delete current.getSingleLineaTransporte.__typename;
            setInputs({...current.getSingleLineaTransporte});
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

export default useFormLineaTransporte;