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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeorm_1 = require("typeorm");
const promise_1 = require("mysql2/promise");
const estudianteModel_1 = require("../models/estudianteModel");
const cursoModel_1 = require("../models/cursoModel");
const profesorModel_1 = require("../models/profesorModel");
const cursoEstudianteModel_1 = require("../models/cursoEstudianteModel");
const port = process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10) : 3306;
function createDatabaseIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)({
            host: process.env.BD_HOST,
            port,
            user: process.env.BD_USER,
            password: process.env.BD_PASWORD,
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.BD_NOMBRE}`);
        yield connection.end();
    });
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.BD_HOST,
    port,
    username: process.env.BD_USER,
    password: process.env.BD_PASWORD,
    database: process.env.BD_NOMBRE,
    entities: [estudianteModel_1.Estudiante, cursoModel_1.Curso, profesorModel_1.Profesor, cursoEstudianteModel_1.CursoEstudiante],
    synchronize: true, // solo para desarrollo; elimina esto en producción
    logging: true
});
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createDatabaseIfNotExists();
        yield exports.AppDataSource.initialize();
    });
}
