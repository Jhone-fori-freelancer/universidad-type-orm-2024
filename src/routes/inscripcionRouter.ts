

import express from 'express';
import {
    inscribir, eliminar, validar,consultarPorFiltro, consultarInscripciones,  modificar,actualizarInscripcion ,mostrarFormularioInscripcion} from '../controllers/InscripcionController';

const router = express.Router();

// Listar inscripciones
router.get('/listarInscripciones', consultarInscripciones);
/*router.get('/listarInscripciones/curso_id', consultarxCurso);
router.get('/listarInscripciones/estudiante_id', consultarxAlumno);*/
router.get('/CursosEstudiantes/listarInscripciones', consultarPorFiltro);

// Insertar inscripciones
router.get('/creaInscripciones',mostrarFormularioInscripcion);  // Usa el controlador para renderizar el formulario*/, mostrarFormularioInscripcion
router.post('/creaInscripciones',validar(), inscribir);  // Validar antes de inscribir

// Modificar inscripciones
router.get('/modificarInscripcion/:estudiante_id/:curso_id', modificar);



router.post('/actualizarInscripcion/:estudiante_id/:curso_id', actualizarInscripcion);
// Eliminar inscripciones

router.delete('/:estudiante_id/:curso_id', eliminar);



export default router;
