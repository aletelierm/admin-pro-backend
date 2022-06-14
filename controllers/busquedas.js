const { response } = require('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');


const getTodo = async(req, res = response)  =>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [ usuario, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medicos.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),

    ]);
   
    res.json({
        ok: true,
        usuario,
        medicos,
        hospitales
        
    });

}

module.exports ={

    getTodo
}