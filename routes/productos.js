const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole, esAdminRole } = require('../middlewares');

const { crearProducto,
        obtenerProducto,
        obtenerProductos, 
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');
const { existeProductoXId, existeCategoriaXId } = require('../helpers/db-validators');

const router = Router();

//Obtener todos los productos - publico
router.get('/', obtenerProductos );

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoXId ),
    validarCampos,
   // obtenerProducto
],obtenerProducto );

//Crear producto 

router.post('/', [
                validarJWT,
                check('nombre','El nombre es obligatorio').not().isEmpty(),
                check('categoria','No es un id de Mongo').isMongoId(),
                check('categoria').custom(existeCategoriaXId),
                validarCampos
            ], crearProducto);

//Actualizar - privado - cualquiera con token valido 
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoXId ),
    validarCampos
], actualizarProducto);

//Borrar un producto - Admin  
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    //tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoXId ),
    validarCampos
], borrarProducto);

module.exports = router;