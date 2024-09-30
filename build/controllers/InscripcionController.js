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
const cursoEstudianteModel_1 = require("../models/cursoEstudianteModel");
const conexion_1 = require("../db/conexion");
const estudianteModel_1 = require("../models/estudianteModel");
const cursoModel_1 = require("../models/cursoModel");
//const Joi = require('joi');
class InscripcionController {
    constructor() { }
    consultarInscripciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursoEstudianteRepository = conexion_1.AppDataSource.getRepository(cursoEstudianteModel_1.CursoEstudiante);
                const resultado = yield cursoEstudianteRepository.find({
                    relations: ['curso', 'estudiante'],
                });
                res.status(200).json(resultado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarxAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cursoEstudianteRepository = conexion_1.AppDataSource.getRepository(cursoEstudianteModel_1.CursoEstudiante);
                const resultado = yield cursoEstudianteRepository.createQueryBuilder('cursoEstudiante')
                    .innerJoinAndSelect('cursoEstudiante.curso', 'curso')
                    .innerJoinAndSelect('cursoEstudiante.estudiante', 'estudiante')
                    .where('estudiante.id = :id', { id: parseInt(id, 10) })
                    .select(['estudiante.nombre AS estudiante', 'curso.nombre AS curso'])
                    .getRawMany();
                res.status(200).json(resultado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarxCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cursoEstudianteRepository = conexion_1.AppDataSource.getRepository(cursoEstudianteModel_1.CursoEstudiante);
                const resultado = yield cursoEstudianteRepository.createQueryBuilder('cursoEstudiante')
                    .innerJoinAndSelect('cursoEstudiante.curso', 'curso')
                    .innerJoinAndSelect('cursoEstudiante.estudiante', 'estudiante')
                    .where('curso.id = :id', { id: parseInt(id, 10) })
                    .select(['estudiante.nombre AS estudiante', 'curso.nombre AS curso'])
                    .getRawMany();
                res.status(200).json(resultado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    inscribir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.body;
            try {
                yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    // Verificar si el estudiante existe
                    const estudiante = yield transactionalEntityManager.findOne(estudianteModel_1.Estudiante, { where: { id: estudiante_id } });
                    if (!estudiante) {
                        return res.status(400).json({ mens: 'Estudiante no existe' });
                    }
                    // Verificar si el curso existe
                    const curso = yield transactionalEntityManager.findOne(cursoModel_1.Curso, { where: { id: curso_id } });
                    if (!curso) {
                        return res.status(400).json({ mens: 'Curso no existe' });
                    }
                    // Verificar si ya está inscrito
                    const existeInscripcion = yield transactionalEntityManager.findOne(cursoEstudianteModel_1.CursoEstudiante, { where: { estudiante: estudiante_id, curso: curso_id } });
                    if (existeInscripcion) {
                        return res.status(400).json({ mens: 'El estudiante ya está inscrito en este curso' });
                    }
                    // Insertar inscripción
                    const cursoEstudiante = new cursoEstudianteModel_1.CursoEstudiante();
                    cursoEstudiante.estudiante = estudiante;
                    cursoEstudiante.curso = curso;
                    yield transactionalEntityManager.save(cursoEstudiante);
                    res.status(200).json({ mens: 'Inscripción realizada' });
                }));
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    cancelarInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.params;
            try {
                yield conexion_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const estudiante = yield transactionalEntityManager.findOne(estudianteModel_1.Estudiante, { where: { id: parseInt(estudiante_id, 10) } });
                    if (!estudiante) {
                        return res.status(400).json({ mens: 'Estudiante no existe' });
                    }
                    const curso = yield transactionalEntityManager.findOne(cursoModel_1.Curso, { where: { id: parseInt(curso_id, 10) } });
                    if (!curso) {
                        return res.status(400).json({ mens: 'Curso no existe' });
                    }
                    const inscripcion = yield transactionalEntityManager.findOne(cursoEstudianteModel_1.CursoEstudiante, {
                        where: {
                            estudiante: { id: parseInt(estudiante_id, 10) },
                            curso: { id: parseInt(curso_id, 10) }
                        }
                    });
                    if (!inscripcion) {
                        return res.status(400).json({ mens: 'La inscripción no existe' });
                    }
                    if (inscripcion.nota > 0) {
                        return res.status(400).json({ mens: 'No se puede cancelar la inscripción porque el estudiante ya ha sido calificado' });
                    }
                    yield transactionalEntityManager.remove(inscripcion);
                    res.status(200).json({ mens: 'Inscripción cancelada' });
                }));
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    calificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estudiante_id, curso_id } = req.params;
            const { nota } = req.body;
            try {
                const cursoEstudianteRepository = conexion_1.AppDataSource.getRepository(cursoEstudianteModel_1.CursoEstudiante);
                if (nota == null || isNaN(nota) || nota < 0 || nota > 10) {
                    return res.status(400).json({ mensaje: "Nota inválida, debe ser un número entre 0 y 10" });
                }
                const cursoEstudiante = yield cursoEstudianteRepository.findOneBy({
                    estudiante_id: parseInt(estudiante_id, 10),
                    curso_id: parseInt(curso_id, 10)
                });
                if (!cursoEstudiante) {
                    return res.status(404).json({ mensaje: "Inscripción no encontrada para el estudiante en el curso especificado" });
                }
                cursoEstudiante.nota = nota;
                cursoEstudiante.fecha = new Date();
                const resultado = yield cursoEstudianteRepository.save(cursoEstudiante);
                res.status(200).json({ mensaje: "Nota asignada correctamente", resultado });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
}
exports.default = new InscripcionController();
