/* 
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');//paquete de express para validar
const { getMedicos, actualizarMedicos, borrarMedicos, crearMedicos } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id hospital debe ser valido').isMongoId(),
        validarCampos

    ],
    crearMedicos
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id hospital debe ser valido').isMongoId(),
        validarCampos        
    ],
    actualizarMedicos
    );

router.delete('/:id',
   
    borrarMedicos
);


//Exportar router
module.exports = router;