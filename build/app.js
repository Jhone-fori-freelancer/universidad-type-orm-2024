"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const estudianteRouter_1 = __importDefault(require("./routes/estudianteRouter"));
const profesorRoutes_1 = __importDefault(require("./routes/profesorRoutes"));
const inscripcionRouter_1 = __importDefault(require("./routes/inscripcionRouter"));
const cursosRouter_1 = __importDefault(require("./routes/cursosRouter"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
//habilitamos pug
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '/views'));
//copiar la carpeta views en public
//la línea 15 la comentamos y ponemos la nueva ubicación, 
//ojo que nos falta modificar el _dirname, descomentar la línea 19
//app.set('views', path.join(__dirname, '.public/views'));
//carpeta pblica
app.use(express_1.default.static('public'));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    console.log(__dirname);
    return res.render('index', {
        pagina: 'App Univerdsidad',
        // errores: errores.array()
    });
});
app.use('/estudiantes', estudianteRouter_1.default);
app.use('/profesores', profesorRoutes_1.default);
app.use('/cursos', cursosRouter_1.default);
app.use('/inscripciones', inscripcionRouter_1.default);
exports.default = app;
