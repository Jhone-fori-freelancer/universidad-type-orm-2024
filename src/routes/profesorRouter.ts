/*
import express from "express";
const router=express.Router();
import profesorController from '../controllers/ProfesoresController';

router.get('/',profesorController.consultarTodos);
router.post('/',profesorController.insertar);

router.route('/:id')
    .get(profesorController.consultarUno)
    .put(profesorController.modificar)
    .delete(profesorController.eliminar);

export default router;*/

import express from 'express';
import { insertar, modificar, eliminar, validar, consultarUno, consultarTodos } from '../controllers/ProfesoresController';

const router = express.Router();

router.get('/listarProfesores', consultarTodos);

//insertar

router.get('/creaProfesores', (req, res) => {
    res.render('creaProfesores', {
        pagina: 'Crear Profesor',
    });
});

router.post('/', validar(), insertar);

//modificar
router.get('/modificaProfesor/:id', async (req, res) => {
    try {
        const profesor = await consultarUno(req, res); 
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.render('modificaProfesor', {
            profesor, 
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});

router.put('/:id', modificar); 

//eliminar
router.delete('/:id', eliminar);

export default router;
