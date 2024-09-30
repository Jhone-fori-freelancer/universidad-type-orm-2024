"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const InscripcionController_1 = __importDefault(require("../controllers/InscripcionController"));
router.get('/', InscripcionController_1.default.consultarInscripciones);
router.get('/xAlumno/:id', InscripcionController_1.default.consultarxAlumno);
router.get('/xCurso/:id', InscripcionController_1.default.consultarxCurso);
router.post('/:estudiante_id/:curso_id', InscripcionController_1.default.calificar);
router.post('/', InscripcionController_1.default.inscribir);
router.delete('/:estudiante_id/:curso_id', InscripcionController_1.default.cancelarInscripcion);
exports.default = router;
