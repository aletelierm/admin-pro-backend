const { response } = require('express');
const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');
const { json } = require('express/lib/response');

//Metodo para leer usuarios
const getUsuarios = async( req, res) =>{

    const usuarios = await Usuario.find({},'nombre email role google');//filtro los campos que quiero traer

    //json entregado al get
    res.json({
        ok:true,
        usuarios,
        uid: req.uid
    });
}

//Metodo para crear usuarios en DB
const crearUsuarios = async( req, res = response ) =>{

    const { email, password } = req.body;
   

    try{
        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'

            });
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Generar un token
        const token = await generarJWT( usuario.id );

        //Guarda en DB usuario nuevo
        await usuario.save();

        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
    
}

const actualizarUsuarios = async( req, res = response) => {

    //TO DO : validar token y comprabar si es usuario correcto
    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById( uid );
                if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }

        //Actualizaciones
        const campos = req.body;

        if( usuarioDB === req.body.email ){

            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({ email: req.body.email});
            if( existeEmail){
                res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con este email'
                });
            }
        }

        //Borramos del json lo que no queremos actualizar
        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos);


        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch ( error ) {
        console.log( error );
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado, revisar logs'
        });

    }

}

const borrarUsuario = async( req, res=response)=>{

    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
         return res.status(200).json({
            ok: true,
            msg: 'no existe el usuario para es ID'

            });
        }
        
        await Usuario.findOneAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario elilminado'
        });


    } catch (error){
        console.log( error );
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado...revisar logs'
        });

    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}