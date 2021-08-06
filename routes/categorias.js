const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole, esAdminRole } = require('../middlewares');
const { crearCategoria,
        obtenerCategoria,
        obtenerCategorias, 
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaXId, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

/** 
 * {{url}}/api/categorias
*/

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaXId ),
    validarCampos,
   // obtenerCategoria
],obtenerCategoria );

//Crear categoria - privado - cualquier persona con un token  válido 
router.post('/', [ 
                validarJWT,
                check('nombre','El nombre es obligatorio').not().isEmpty(), 
                validarCampos
            ], crearCategoria );

//Actualizar - privado - cualquiera con token valido 
router.put('/:id',[
                validarJWT,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('id').custom( existeCategoriaXId ),
                validarCampos
            ], actualizarCategoria);

//Borrar una categoria - Admin  
router.delete('/:id',[
                validarJWT,
                esAdminRole,
                //tieneRole('ADMIN_ROLE'),
                check('id', 'No es un id de Mongo válido').isMongoId(),
                check('id').custom( existeCategoriaXId ),
                validarCampos
            ], borrarCategoria);



module.exports = router;