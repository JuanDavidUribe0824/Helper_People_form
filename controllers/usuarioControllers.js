import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}
const registrar = async (req, res) => {
    //Validacion
    await check('nombre').notEmpty().withMessage('El Nombre No puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Esto No es un Email').run(req)
    await check('password').isLength({min: 8}).withMessage('Debe de ser al menos 8 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Los Password No son iguales').run(req)

    let resultado = validationResult(req)

    //return res.json({errores: resultado.array()})

    //Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array()
        })
    }

    const usuario = await Usuario.create(req.body)
    res.json(usuario)
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a HelperPeople'
    })
}

export {
    formularioLogin ,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
    
}