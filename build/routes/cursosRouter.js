"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CursoController_1 = __importDefault(require("../controllers/CursoController"));
const router = express_1.default.Router();
router.get('/', CursoController_1.default.consultarTodos);
router.post('/', CursoController_1.default.insertar);
router.route('/:id')
    .get(CursoController_1.default.consultarUno)
    .put(CursoController_1.default.modificar)
    .delete(CursoController_1.default.eliminar);
exports.default = router;
