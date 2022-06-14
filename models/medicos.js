const { Schema, model } = require('mongoose');

const MedicosSchema = Schema({

    nombre: {
        required: true,
        type: String
       
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
       
    },
    hospital:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
        
    }

});

module.exports = model( 'Medicos', MedicosSchema );