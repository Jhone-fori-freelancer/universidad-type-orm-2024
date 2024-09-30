"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminar = exports.modificar = exports.insertar = exports.consultarUno = exports.consultarTodos = exports.validar = void 0;
const express_validator_1 = require("express-validator");
const estudianteModel_1 = require("../models/estudianteModel");
const conexion_1 = require("../db/conexion");
const cursoEstudianteModel_1 = require("../models/cursoEstudianteModel");
var estudiantes;
const validar = () => [
    (0, express_validator_1.check)('dni')
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7 }).withMessage('El DNI debe tener al menos 7 caracteres'),
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El Nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 3 }).withMessage('El Apellido debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Debe proporcionar un email válido'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            return res.render('creaEstudiantes', {
                pagina: 'Crear Estudiante',
                errores: errores.array()
            });
        }
        next();
    }
];
exports.validar = validar;
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudianteRepository = conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante);
        console.log('rede');
        estudiantes = yield estudianteRepository.find();
        res.render('listarEstudiantes', {
            pagina: 'Lista de Estudiantes',
            varnav: 'listar',
            estudiantes
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.consultarTodos = consultarTodos;
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
        throw new Error('ID inválido, debe ser un número');
    }
    try {
        const estudianteRepository = conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante);
        const estudiante = yield estudianteRepository.findOne({ where: { id: idNumber } });
        if (estudiante) {
            return estudiante;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        else {
            throw new Error('Error desconocido');
        }
    }
});
exports.consultarUno = consultarUno;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('cargaEstudiantes', {
            pagina: 'Crear Estudiante',
            errores: errores.array()
        });
    }
    const { dni, nombre, apellido, email } = req.body;
    try {
        yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const estudianteRepository = transactionalEntityManager.getRepository(estudianteModel_1.Estudiante);
            const existeEstudiante = yield estudianteRepository.findOne({
                where: [
                    { dni },
                    { email }
                ]
            });
            if (existeEstudiante) {
                throw new Error('El estudiante ya existe.');
            }
            const nuevoEstudiante = estudianteRepository.create({ dni, nombre, apellido, email });
            yield estudianteRepository.save(nuevoEstudiante);
        }));
        const estudiantes = yield conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante).find();
        res.render('listarEstudiantes', {
            pagina: 'Lista de Estudiantes',
            estudiantes
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { dni, nombre, apellido, email } = req.body;
    try {
        const estudianteRepository = conexion_1.AppDataSource.getRepository(estudianteModel_1.Estudiante);
        const estudiante = yield estudianteRepository.findOne({ where: { id: parseInt(id) } });
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        estudianteRepository.merge(estudiante, { dni, nombre, apellido, email });
        yield estudianteRepository.save(estudiante);
        return res.redirect('/estudiantes/listarEstudiantes');
    }
    catch (error) {
        console.error('Error al modificar el estudiante:', error);
        return res.status(500).send('Error del servidor');
    }
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log(`ID recibido para eliminar: ${id}`);
        yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const cursosEstudiantesRepository = transactionalEntityManager.getRepository(cursoEstudianteModel_1.CursoEstudiante);
            const estudianteRepository = transactionalEntityManager.getRepository(estudianteModel_1.Estudiante);
            const cursosRelacionados = yield cursosEstudiantesRepository.count({ where: { estudiante: { id: Number(id) } } });
            if (cursosRelacionados > 0) {
                throw new Error('Estudiante cursando materias, no se puede eliminar');
            }
            const deleteResult = yield estudianteRepository.delete(id);
            if (deleteResult.affected === 1) {
                return res.json({ mensaje: 'Estudiante eliminado' });
            }
            else {
                throw new Error('Estudiante no encontrado');
            }
        }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ mensaje: err.message });
        }
        else {
            res.status(400).json({ mensaje: 'Error' });
        }
    }
});
exports.eliminar = eliminar;
