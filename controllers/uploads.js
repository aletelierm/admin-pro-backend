const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagenes');

const fileUpload = ( req, res=response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if( !tiposValidos.includes( tipo )){
            return res.status(400).json({
                ok: false,
                msg: 'No es del tipo: medico, usuario u hospital'
            });
    }
   
    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
                ok: false,
                msg: 'No se selecciono ningun archivo'

        });
    }

    //Procesar la imagen
    const file = req.files.imagen;

    //Sabes la extension del archivo
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //Validar la extension
    const exntensionesValidas= ['png','jpg','jpeg','gif'];
    if( !exntensionesValidas.includes( extensionArchivo )){
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no valida'
      });
    }
    
    //Generar el nombre del archivo.Con librerira uuid
    const nombrearchiv = `${ uuidv4() }.${ extensionArchivo }`;

    //path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombrearchiv }`;

    //mover el archivo al path de destino
    file.mv( path , function(err) {
        if (err){

            return  res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagenn'
            });
        }

        //Actualizar la imagen en DB
        actualizarImagen( tipo, id, nombrearchiv );
    
        res.json({
        ok: true,
        msg: 'Archivo subido',
        nombrearchiv
                });
    });
         

}

const retornaImagen =(req, res= response )=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    //Imagen por defecto
    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no_image.png`);
        res.sendFile( pathImg );
    }

    
}

module.exports = {

    fileUpload,
    retornaImagen
}
