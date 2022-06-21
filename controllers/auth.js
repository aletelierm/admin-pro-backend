const  bcrypt  = require('bcryptjs');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const login = async( req, res=response ) => {   

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({ email });

        //Verificar Email
        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if(!validPassword){
            return res.json({
                ok:false,
                msg:'Error: contraseña o email no valido'
            });

        }

        //Generar un token
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            msg: 'Bienvenido al Sistema: '+usuarioDB.nombre+' tu token es: '+token
        });

    } catch (error){
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
            
        });
    }
}

const googleSignIn = async(req, res= response)=>{



    try {

        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true

            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;

        }

        //Guardar usuario
        await usuario.save();

        //Generar un token JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(400).json({            
            ok: false,
            msg: 'token de google no es correcto'
        });


    }



       
}

module.exports = {
    login,
    googleSignIn
}