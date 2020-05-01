import { useState, useEffect } from 'react';

function useForm(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleRuta){
            delete current.getSingleRuta.__typename;
            setInputs({...current.getSingleRuta});
        }
    },[current]);
    
    const handleInputChange = event => {
        event.persist();
        console.log("== Valor handleInputChange");
        console.log(event.target);
        const {name, value} = event.target;
        setInputs(fields => ({...fields, [name]: value}));
    };

    const handleInputSelected = (name, value) => {
        console.log("== Valor handleInputSelected");
        console.log(name);
        console.log(value);
        setInputs(fields => ({...fields, [name]: value}));
    };

    const handleSubmit = event => {
        if(event) event.preventDefault();
        callback(inputs);
    };

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        handleInputSelected
    }
};

export default useForm;