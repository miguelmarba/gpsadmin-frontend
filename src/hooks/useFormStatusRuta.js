import { useState, useEffect } from 'react';

function useForm(callback, current={}){
    const [inputs, setInputs] = useState(current);

    useEffect(() => {
        if(current.getSingleStatusRuta){
            delete current.getSingleStatusRuta.__typename;
            setInputs({...current.getSingleStatusRuta});
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

    const handleChangeSketchPicker = (value) => {
        const name = 'color';
        setInputs(fields => ({...fields, [name]: value.hex}));
    }

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        handleChangeSketchPicker
    }
};

export default useForm;