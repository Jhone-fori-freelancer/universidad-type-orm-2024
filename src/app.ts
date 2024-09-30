import express, {Request, Response }  from "express";
import cors from 'cors';
import morgan from "morgan";
import path from "path";
import estudianteRouter from'./routes/estudianteRouter';
import profesorRouter from './routes/profesorRouter';
import inscripcionRouter from './routes/inscripcionRouter';
import cursoRouter from './routes/cursoRouter';
import methodOverride from 'method-override';

const app=express();

//habilitamos pug
app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, '/views'));
//copiar la carpeta views en public
//la línea 15 la comentamos y ponemos la nueva ubicación, 
//ojo que nos falta modificar el _dirname, descomentar la línea 19
app.set('views', path.join(__dirname, './views'));

//carpeta pblica
app.use(express.static('public'));



app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get('/',(req:Request,res:Response)=>{
    console.log(__dirname);
    return res.render('index', {
        pagina: 'App Univerdsidad',
       // errores: errores.array()
    });
});
app.use('/estudiantes', estudianteRouter);
app.use('/profesores',profesorRouter );
app.use('/cursos', cursoRouter );
app.use('/CursosEstudiantes',inscripcionRouter);
app.post('/CursosEstudiantes/actualizarInscripcion/:idEstudiante/:idCurso', (req, res) => {
   
});

export default app;

