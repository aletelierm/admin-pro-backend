/*

    ruta: api/upload

*/
const expressFileUpload = require('express-fileupload');

const { Router } = require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt')

router.use(expressFileUpload());

router.put( '/:tipo/:id' , fileUpload);

router.get( '/:tipo/:foto' , retornaImagen );


module.exports = router;