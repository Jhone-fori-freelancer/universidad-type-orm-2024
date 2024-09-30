import express from 'express';
import { insertar, modificar, eliminar, validar, consultarUno, consultarTodos } from '../controllers/EstudianteController';

const router = express.Router();

router.get('/listarEstudiantes', consultarTodos);

//insertar

router.get('/creaEstudiantes', (req, res) => {
    res.render('creaEstudiantes', {
        pagina: 'Crear Estudiante',
    });
});

router.post('/', validar(), insertar);

//modificar
router.get('/modificaEstudiante/:id', async (req, res) => {
    try {
        const estudiante = await consultarUno(req, res); 
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.render('modificaEstudiante', {
            estudiante, 
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
