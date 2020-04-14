import { useState, useEffect } from 'react';

function useForm(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleUser){
            delete current.getSingleUser.__typename;
            setInputs({...current.getSingleUser});
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

export default useForm;