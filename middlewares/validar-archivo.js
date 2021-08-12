const { response } = require("express")

const validarArchivoSubir = (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivo para subir - validarArchivoSubido'
        });
    }
    //Si todo lo del codigo de arriba pasa, con next() continuamos hacia el siguiente Middleware 
    next();

}

module.exports = {
    validarArchivoSubir
}