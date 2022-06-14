/* 
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');//paquete de express para validar
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', getHospitales);
router.post('/',
    [ validarJWT,
      check('nombre', 'El nombre del Hospital es obligatorio').not().isEmpty(),
      validarCampos
     ],
    crearHospitales
);

router.put('/:id',
    [],
    actualizarHospitales
    );

router.delete('/:id',
   
    borrarHospitales
);


//Exportar router
module.exports = router;