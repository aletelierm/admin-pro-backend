/*

    ruta: api/todo/:busqueda

*/

const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt')
const { getTodo } = require('../controllers/busquedas');



router.get( '/:busqueda' , validarJWT  , getTodo);


module.exports = router;
