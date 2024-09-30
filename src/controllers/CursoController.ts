import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { AppDataSource } from '../db/conexion';
import { Curso } from '../models/cursoModel';
import { Profesor } from '../models/profesorModel';
import { CursoEstudiante } from '../models/cursoEstudianteModel';
import { Estudiante } from '../models/estudianteModel';

var cursos: Curso[];

export const validar = () => [
    
    check('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El Nombre debe tener al menos 3 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción es obligatoria')    
        .isLength({ min: 3 }).withMessage('La Descripción debe tener al menos 3 caracteres'),
        
    (req: Request, res: Response, next: NextFunction) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.render('creaCursos', {
                pagina: 'Crear Curso',
                errores: errores.array()
            });
        }
        next();
    }
];

export const consultarTodos = async (req: Request, res: Response) => {
        try {
            const cursoRepository = AppDataSource.getRepository(Curso);
            cursos = await cursoRepository.find({
                relations: ['profesor'], // Añadimos la relación con profesor
            });
            res.render('listarCursos', {
                pagina: 'Lista de Cursos',
                cursos 
            });
            console.log(cursos);        
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

export const consultarUno = async (req: Request, res: Response): Promise<Curso | null> => { 
        const {id}=req.params;
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new Error('ID inválido, debe ser un número');
        }
    
        try {
            const cursoRepository = AppDataSource.getRepository(Curso);
            const curso = await cursoRepository.findOne({
                where: { id: idNumber },
            });
            if (curso) {
                return curso;
            } else {
                return null;
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw err; 
        } else {
            throw new Error('Error desconocido');
            }
        }
    };
/*
export const insertar = async (req: Request, res: Response) => {  
    console.log(req.body);
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.render('creaCursos', {
            pagina: 'Crear Curso',
            errores: errores.array()
        });
    }
    const { nombre, descripcion, profesor_id } = req.body;
    
    try {

        await AppDataSource.transaction(async transactionalEntityManager => {
               
            const cursoRepository = await transactionalEntityManager.getRepository(Curso)
            const profesorRepository = await transactionalEntityManager.getRepository(Profesor);
            
            
            //verifico que exista el profesor que elijo para el curso
            const existeProfesor = await profesorRepository.findOne({ where: { id: profesor_id } });
            console.log('Profesor encontrado:', existeProfesor);

            if (!existeProfesor) {
                throw new Error('El profesor no existe.');
            }

            //verifico que exista el curso que 
            const existeCurso = await cursoRepository.findOne({
                where: [
                    { nombre },
                    { descripcion }
                ]
            });

            if (existeCurso) {
                throw new Error('El curso ya existe.');
            }
            

            const nuevoCurso = cursoRepository.create({ nombre, descripcion, profesor: existeProfesor }); // Aquí asigno el objeto Profesor
            console.log('Nuevo curso a insertar:', nuevoCurso);
            await cursoRepository.save(nuevoCurso);
          
        });
        // Redireccionar o mostrar mensaje de éxito
            res.redirect('/cursos/listarCursos'); // Redireccionar a la lista de cursos después de la inserción
           
    
        } 
        catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
     */
    export const insertar = async (req: Request, res: Response) => {
        const errores = validationResult(req);
        
    
        // Manejo de errores de validación
        if (!errores.isEmpty()) {
            const profesorRepository = AppDataSource.getRepository(Profesor);
            const profesores = await profesorRepository.find();
            return res.render('creaCursos', {
                pagina: 'Crear Curso',
                profesores,
                cursos
            });
        }
    
        const { nombre, descripcion, profesor_id } = req.body;
    
        try {
            await AppDataSource.transaction(async transactionalEntityManager => {
                const profesorRepository = transactionalEntityManager.getRepository(Profesor);
                const cursoRepository = transactionalEntityManager.getRepository(Curso);
                const existeProfesor = await profesorRepository.findOne({ where: { id: Number(profesor_id) } });
                
                if (!existeProfesor) {
                    throw new Error('El profesor no existe.');
                }
    
                const existeCurso = await cursoRepository.findOne({
                    where: [
                        { nombre },
                        { descripcion }
                    ]
                });
    
                if (existeCurso) {
                    throw new Error('El curso ya existe.');
                }
    
                const nuevoCurso = cursoRepository.create({ 
                    nombre, descripcion, profesor: existeProfesor });
                await cursoRepository.save(nuevoCurso);
            });
           
            res.redirect('/cursos/listarCursos'); 
        } catch (err: unknown) {
            console.error(err); // Registro del error
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    };
     
export const modificar = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { nombre, descripcion, profesor_id} = req.body;
    
        try {
            
            
            const cursoRepository = AppDataSource.getRepository(Curso);
            const curso = await cursoRepository.findOne({ where: { id: parseInt(id) } });   
            // Verificar si el curso y el profesor  existe
            if (!curso) {
                return res.status(404).json({ mensaje: 'El curso no existe' });
            }

            const profesorRepository = AppDataSource.getRepository(Profesor);
            const profesor = await profesorRepository.findOne({ where: { id: profesor_id } });
            if (!profesor) {
            return res.status(400).json({ mensaje: 'El profesor no existe' });
             }
            // Actualizar el curso
            cursoRepository.merge(curso, { nombre, descripcion, profesor });
            await cursoRepository.save(curso);

            return res.redirect('/cursos/listarCursos');
        } catch (error) {
            console.error('Error al modificar el curso:', error);
            return res.status(500).send('Error del servidor');
            }
        };
               
export const eliminar = async (req: Request, res: Response) => {
    console.log(req.params);  // Verifica qué parámetros llegan al backend
    const { id} = req.params;
    console.log(`ID Curso: ${id}`);

    if (!id ) {
        return res.status(400).json({ mensaje: 'Faltan parámetros' });
    }
    try{
        console.log(`ID recibido para eliminar: ${id} `); 
        await AppDataSource.transaction(async transactionalEntityManager => {
            const cursoEstudianteRepository = transactionalEntityManager.getRepository(CursoEstudiante); //estudiantes cursando
            const cursoRepository = transactionalEntityManager.getRepository(Curso);
           

           // Verificar si hay alumnos asociados al curso   
           const estudiantesAsignados = await cursoEstudianteRepository.count({ where: { curso: { id: Number(id) } } });
            console.log(`Número de estudiantes cursando el curso: ${estudiantesAsignados}`);
            
            if (estudiantesAsignados > 0) {
                throw new Error('Estudiante cursando materia, no se puede eliminar');
            }
            const curso = await cursoRepository.findOne({ where: { id: Number(id) } });
            if (!curso) {
                throw new Error('El curso no existe');
            }
            
            // Verificar si el curso existe
            
            const deleteResult = await cursoRepository.delete(id); 
            console.log(`Resultado de la eliminación: ${JSON.stringify(deleteResult)}`);
            if (deleteResult.affected === 1) {
            return res.json({ mensaje: 'Curso eliminado' }); 
            } else {
            throw new Error('Curso no encontrado');
        }   
    },
    );

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({ mensaje: err.message });
        } else {
            res.status(400).json({ mensaje: 'Error' });
        }
    }
    }  
