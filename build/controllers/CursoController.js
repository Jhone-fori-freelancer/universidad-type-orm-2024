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
const conexion_1 = require("../db/conexion");
const cursoModel_1 = require("../models/cursoModel");
const profesorModel_1 = require("../models/profesorModel");
class CursoController {
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
                const cursos = yield cursoRepository.find({ relations: ["profesor"] });
                res.status(200).json(cursos);
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
                const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
                const curso = yield cursoRepository.findOne({
                    where: { id: parseInt(req.params.id) },
                    relations: ["profesor"]
                });
                if (curso) {
                    res.status(200).json(curso);
                }
                else {
                    res.status(400).json({ mensaje: 'Curso no encontrado' });
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
            const { nombre, descripcion, profesor_id } = req.body;
            try {
                yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const profesor = yield transactionalEntityManager.findOne(profesorModel_1.Profesor, { where: { id: profesor_id } });
                    if (!profesor) {
                        return res.status(400).json({ mensaje: 'El profesor no existe' });
                    }
                    const nuevoCurso = new cursoModel_1.Curso();
                    nuevoCurso.nombre = nombre;
                    nuevoCurso.descripcion = descripcion;
                    nuevoCurso.profesor = profesor; // Relacionar con el objeto profesor obtenido
                    const cursoInsertado = yield transactionalEntityManager.save(nuevoCurso);
                    res.status(200).json({ id: cursoInsertado.id });
                }));
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
            const { id } = req.params;
            const { nombre, descripcion, profesor_id } = req.body;
            try {
                yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    // Verificar si el profesor existe
                    const profesor = yield transactionalEntityManager.findOne(profesorModel_1.Profesor, { where: { id: profesor_id } });
                    if (!profesor) {
                        return res.status(400).json({ mensaje: 'El profesor no existe' });
                    }
                    // Verificar si el curso existe
                    const curso = yield transactionalEntityManager.findOne(cursoModel_1.Curso, { where: { id: parseInt(id, 10) } });
                    if (!curso) {
                        return res.status(404).json({ mensaje: 'El curso no existe' });
                    }
                    // Actualizar el curso utilizando merge
                    transactionalEntityManager.merge(cursoModel_1.Curso, curso, {
                        nombre,
                        descripcion,
                        profesor,
                    });
                    // Guardar los cambios
                    const cursoActualizado = yield transactionalEntityManager.save(curso);
                    res.status(200).json({ curso: cursoActualizado });
                }));
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cursoRepository = conexion_1.AppDataSource.getRepository(cursoModel_1.Curso);
                const curso = yield cursoRepository.findOne({ where: { id: parseInt(id, 10) } });
                if (!curso) {
                    return res.status(404).json({ mensaje: 'El curso no existe' });
                }
                yield cursoRepository.remove(curso);
                res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new CursoController();
