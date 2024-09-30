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
const profesorModel_1 = require("../models/profesorModel");
const conexion_1 = require("../db/conexion");
const cursoModel_1 = require("../models/cursoModel");
class ProfesorController {
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesorRepository = conexion_1.AppDataSource.getRepository(profesorModel_1.Profesor);
                const profesores = yield profesorRepository.find();
                res.status(200).json(profesores);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const profesorRepository = conexion_1.AppDataSource.getRepository(profesorModel_1.Profesor);
                const profesor = yield profesorRepository.findOne({ where: { id: Number(id) } });
                if (profesor) {
                    res.status(200).json(profesor);
                }
                else {
                    res.status(400).json({ mensaje: 'Profesor no encontrado' });
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, nombre, apellido, email, profesion, telefono } = req.body;
            try {
                const profesorRepository = conexion_1.AppDataSource.getRepository(profesorModel_1.Profesor);
                const nuevoProfesor = profesorRepository.create({ dni, nombre, apellido, email, profesion, telefono });
                const resultado = yield profesorRepository.save(nuevoProfesor);
                res.status(201).json({ id: resultado.id });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesorRepository = conexion_1.AppDataSource.getRepository(profesorModel_1.Profesor);
                const profesor = yield profesorRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!profesor) {
                    throw new Error('Profesor no encontrado');
                }
                profesorRepository.merge(profesor, req.body);
                const result = yield profesorRepository.save(profesor);
                res.json(result);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(404).json({ message: err.message });
                }
                else {
                    res.status(500).json({ message: 'Error' });
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const cursoRepository = transactionalEntityManager.getRepository(cursoModel_1.Curso);
                    const profesorRepository = transactionalEntityManager.getRepository(profesorModel_1.Profesor);
                    const cursosRelacionados = yield cursoRepository.count({ where: { profesor: { id: Number(id) } } });
                    if (cursosRelacionados > 0) {
                        throw new Error('Profesor dictando materias, no se puede eliminar');
                    }
                    const deleteResult = yield profesorRepository.delete(id);
                    if (deleteResult.affected === 1) {
                        res.status(200).json({ mensaje: 'Profesor eliminado' });
                    }
                    else {
                        throw new Error('Profesor no encontrado');
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
    }
}
exports.default = new ProfesorController();
