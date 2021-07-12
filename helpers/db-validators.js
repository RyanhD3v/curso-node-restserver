const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol }); 
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
            throw new Error(`El email ${ correo } ya existe `);
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuarioId = await Usuario.findById(id);
    if ( !existeUsuarioId ) {
            throw new Error(`El id ${ id } no existe `);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}