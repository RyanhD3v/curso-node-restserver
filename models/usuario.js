
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria '],
    },
    img:{
        type: String,
        
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },

});

//Metodo para evitar que nos retorne en __v y el password en el JSON

UsuarioSchema.methods.toJSON = function name(params) {
    const { __v, password, _id, ...usuario } = this.toObject();
    //despues de extraer renombremos el _id x uid
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema);