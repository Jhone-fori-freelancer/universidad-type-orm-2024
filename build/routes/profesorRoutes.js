"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ProfesoresController_1 = __importDefault(require("../controllers/ProfesoresController"));
router.get('/', ProfesoresController_1.default.consultarTodos);
router.post('/', ProfesoresController_1.default.insertar);
router.route('/:id')
    .get(ProfesoresController_1.default.consultarUno)
    .put(ProfesoresController_1.default.modificar)
    .delete(ProfesoresController_1.default.eliminar);
exports.default = router;
