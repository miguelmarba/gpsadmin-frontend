import { useState, useEffect } from 'react';

function useForm(callback, current={}){
    const [inputs, setInputs] = useState(current);
    const [options, setOptions] = useState({cliente:[], origen:[], destino:[], linea_transporte:[], operador:[], camion:[], caja:[], equipo_gps:[]});
    const [selected, setSelected] = useState({cliente:[], origen:[], destino:[], linea_transporte:[], operador:[], camion:[], caja:[], equipo_gps:[]});

    useEffect(() => {
        if(current.getSingleRuta){
            delete current.getSingleRuta.__typename;
            //setInputs({...current.getSingleRuta});
            if(current.getSingleRuta.cliente){
                handleInputSelected('cliente', current.getSingleRuta.cliente._id);
                delete current.getSingleRuta.cliente.__typename;
                const name = 'cliente';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.cliente]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.cliente]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.cliente._id}));
            }
            if(current.getSingleRuta.origen){
                handleInputSelected('origen', current.getSingleRuta.origen._id);
                delete current.getSingleRuta.origen.__typename;
                const name = 'origen';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.origen]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.origen]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.origen._id}));
            }
            if(current.getSingleRuta.destino){
                handleInputSelected('destino', current.getSingleRuta.destino._id);
                delete current.getSingleRuta.destino.__typename;
                const name = 'destino';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.destino]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.destino]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.destino._id}));
            }
            if(current.getSingleRuta.linea_transporte){
                handleInputSelected('linea_transporte', current.getSingleRuta.linea_transporte._id);
                delete current.getSingleRuta.linea_transporte.__typename;
                const name = 'linea_transporte';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.linea_transporte]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.linea_transporte]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.linea_transporte._id}));
            }
            if(current.getSingleRuta.operador){
                handleInputSelected('operador', current.getSingleRuta.operador._id);
                delete current.getSingleRuta.operador.__typename;
                const name = 'operador';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.operador]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.operador]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.operador._id}));
            }
            if(current.getSingleRuta.camion){
                handleInputSelected('camion', current.getSingleRuta.camion._id);
                delete current.getSingleRuta.camion.__typename;
                const name = 'camion';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.camion]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.camion]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.camion._id}));
            }
            if(current.getSingleRuta.caja){
                handleInputSelected('caja', current.getSingleRuta.caja._id);
                delete current.getSingleRuta.caja.__typename;
                const name = 'caja';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.caja]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.caja]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.caja._id}));
            }
            if(current.getSingleRuta.equipo_gps){
                handleInputSelected('equipo_gps', current.getSingleRuta.equipo_gps._id);
                delete current.getSingleRuta.equipo_gps.__typename;
                const name = 'equipo_gps';
                setOptions(fields => ({...fields, [name]: [current.getSingleRuta.equipo_gps]}));
                setSelected(fields => ({...fields, [name]: [current.getSingleRuta.equipo_gps]}));
                setInputs(fields => ({...fields, [name]: current.getSingleRuta.equipo_gps._id}));
            }
            if(!current.getSingleRuta.fecha_salida){
                inputs.fecha_salida = new Date();
            } else {
                const d = new Date(current.getSingleRuta.fecha_salida);
                inputs.fecha_salida = d;
            }
            if(!current.getSingleRuta.fecha_cita){
                inputs.fecha_cita = new Date();
            } else {
                const d = new Date(current.getSingleRuta.fecha_cita);
                inputs.fecha_cita = d;
            }
        }
    },[current]);
    
    const handleInputOptions = (name, value) => {
        setOptions(fields => ({...fields, [name]: value}));
    };

    const handleInputChange  = (name, value) => {
        setInputs(fields => ({...fields, [name]: value}));
        setSelected(fields => ({...fields, [name]: value}));
    };

    const handleInputSelected = (name, value) => {
        setInputs(fields => ({...fields, [name]: value[0].id}));
        setSelected(fields => ({...fields, [name]: value}));
    };

    const handleSubmit = event => {
        if(event) event.preventDefault();
        callback(inputs);
    };

    return {
        inputs,
        handleInputChange,
        handleInputOptions,
        handleSubmit,
        handleInputSelected,
        options,
        selected
    }
};

export default useForm;