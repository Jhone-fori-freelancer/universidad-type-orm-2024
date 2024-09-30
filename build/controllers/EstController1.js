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
exports.eliminar = exports.modificar = exports.consultarUno = exports.insertar = exports.consultarTodos = void 0;
const data_source_1 = require("../data-source");
const Estudiante_1 = require("../model/Estudiante");
const estudianteRepository = data_source_1.AppDataSource.getRepository(Estudiante_1.Estudiante);
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiantes = yield estudianteRepository.find();
    res.json(estudiantes);
});
exports.consultarTodos = consultarTodos;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = estudianteRepository.create(req.body);
    const result = yield estudianteRepository.save(estudiante);
    res.json(result);
});
exports.insertar = insertar;
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
    res.json(estudiante);
});
exports.consultarUno = consultarUno;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!estudiante)
        return res.status(404).json({ message: "Curso no encontrado" });
    estudianteRepository.merge(estudiante, req.body);
    const result = yield estudianteRepository.save(estudiante);
    res.json(result);
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield estudianteRepository.delete(req.params.id);
    res.json(result);
});
exports.eliminar = eliminar;
