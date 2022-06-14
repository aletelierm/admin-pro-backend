const { response } = require('express');
const  Medicos  = require('../models/medicos');

const getMedicos = async(req, res = response)  =>{

    const medicos = await Medicos.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')
                               

    res.json({
        ok: true,
        medicos: medicos
    });

}


const crearMedicos = async( req, res = response ) =>{

    const uid = req.uid;
    const medicos = new Medicos({
        usuario: uid,
        ...req.body
    });
  

    try {
        const medicosDB = await medicos.save();

        res.json({
            ok: true,
            medicos: medicosDB
        });

    }catch(error){
        console.log(error)    
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const actualizarMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    });

}

const borrarMedicos = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    });


}




module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos

}

