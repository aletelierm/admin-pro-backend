const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const borrarImagen = ( path )=>{

    if(fs.existsSync( path)){
        //Borrar la imagen
        fs.unlinkSync( path);
    }
}


const actualizarImagen = async( tipo, id, nombrearchiv )=>{

    let pathViejo ='';

    switch( tipo ){
            case 'medicos':
                const medico = await Medico.findById(id);
                if(!medico){
                    console.log('no es un medico po id');
                    return false;
                }

                pathViejo = `./uploads/medicos/${ medico.img }`;
                borrarImagen( pathViejo );

                medico.img = nombrearchiv;
                await medico.save();
                return true;

            break;

            case 'hospitales':
                const hospitales = await Hospital.findById(id);
                if(!hospitales){
                    console.log('no es un hospital po id');
                    return false;
                }

                pathViejo = `./uploads/hospitales/${ hospitales.img }`;
                borrarImagen( pathViejo );

                hospitales.img = nombrearchiv;
                await hospitales.save();
                return true;
            break;

            case 'usuarios':
                const usuarios = await Usuario.findById(id);
                if(!usuarios){
                    console.log('no es un usuario por id');
                    return false;
                }

                pathViejo = `./uploads/usuarios/${ usuarios.img }`;
                borrarImagen( pathViejo );

                usuarios.img = nombrearchiv;
                await usuarios.save();
                return true;

            break;
    }



}


module.exports = {

    actualizarImagen
}