/* 
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');//paquete de express para validar
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT, getUsuarios);
router.post('/',
//Midleware para validar.importacion express-validator
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,

    ],
    crearUsuarios
);

router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),       
        check('email','El email es obligatorio').isEmail(),
        check('role', ' El role es obligatorio').not().isEmpty(),
        validarCampos,
        
    ],
    actualizarUsuarios 
    );

router.delete('/:id',
    validarJWT,
    borrarUsuario
);


//Exportar router
module.exports = router;