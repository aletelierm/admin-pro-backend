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

const actualizarMedicos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
   


    try {

        const medicos = await Medicos.findById( id );
        //console.log(medicos);
        if(!medicos){

            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate(id, cambiosMedicos, { new: true});

        res.json({
            ok: true,           
            medico : medicoActualizado
        });


    } catch(error){

            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'No es posible actualizar medicos'
                        });

    }
    
}

const borrarMedicos = async( req, res = response ) => {

    const id = req.params.id;
    
    try {

        const medico = await Medicos.findById( id );
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
                
            });
        }

        await Medicos.findByIdAndDelete( id );
        res.json({
            ok: true,           
           msg: 'Medico Eliminado'
        });

    } catch(error){

            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'No es posible borrar , llame al administrado'
            });
    

}

}


module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos

}

