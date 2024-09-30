"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoEstudiante = void 0;
const typeorm_1 = require("typeorm");
const estudianteModel_1 = require("./estudianteModel");
const cursoModel_1 = require("./cursoModel");
let CursoEstudiante = class CursoEstudiante {
};
exports.CursoEstudiante = CursoEstudiante;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], CursoEstudiante.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], CursoEstudiante.prototype, "curso_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: () => 0 }),
    __metadata("design:type", Number)
], CursoEstudiante.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], CursoEstudiante.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudianteModel_1.Estudiante, (estudiante) => estudiante.cursos),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", estudianteModel_1.Estudiante)
], CursoEstudiante.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cursoModel_1.Curso, (curso) => curso.estudiantes),
    (0, typeorm_1.JoinColumn)({ name: 'curso_id' }),
    __metadata("design:type", cursoModel_1.Curso)
], CursoEstudiante.prototype, "curso", void 0);
exports.CursoEstudiante = CursoEstudiante = __decorate([
    (0, typeorm_1.Entity)('cursos_estudiantes')
], CursoEstudiante);
