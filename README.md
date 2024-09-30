# 🎓 Proyecto Universidad 📚

## ✨ Descripción del Proyecto
Este proyecto es una aplicación web para gestionar la información universitaria, como estudiantes, profesores y cursos. La aplicación está desarrollada utilizando TypeScript junto con TypeORM para la gestión de la base de datos relacional, y Pug para la generación de vistas dinámicas. Se creó como parte de la asignatura **"Desarrollo de Aplicaciones Web"** y sigue la arquitectura MVC (Modelo-Vista-Controlador) para una mejor organización y escalabilidad del código.

## 🚀 Tecnologías Utilizadas
- **TypeScript**: Lenguaje principal del proyecto para tipado estático y mayor robustez.
- **TypeORM**: ORM utilizado para interactuar con la base de datos relacional.
- **Express.js**: Framework para crear la API REST de manera rápida y eficiente.
- **Pug**: Motor de plantillas que facilita la creación de interfaces de usuario dinámicas.
- **MySQL**: Base de datos utilizada para almacenar toda la información.
- **Node.js**: Entorno de ejecución para el servidor.
- **express-validator**: Middleware para realizar validaciones.
- **SweetAlert2**: Biblioteca para mostrar alertas atractivas en el frontend.
- **Tailwind CSS**: Framework de CSS para crear interfaces modernas y estilizadas de manera rápida.

## 📁 Estructura del Proyecto
El proyecto se organiza en varias carpetas y archivos para separar las responsabilidades de cada componente:

### **/build/**
Carpeta que contiene el código compilado a JavaScript.

### **/src/** 
Contiene el código fuente en TypeScript del proyecto:

- **/controller/**: Controladores que gestionan la lógica de cada entidad.
  - `cursoController.ts`: Controlador para gestionar cursos.
  - `estudianteController.ts`: Controlador para gestionar estudiantes.
  - `inscripcionController.ts`: Controlador para gestionar la relación curso-estudiante.
  - `profesorController.ts`: Controlador para gestionar profesores.

- **/db/**: Configuración de la base de datos.
  - `conexion.ts`: Archivo para establecer la conexión con la base de datos.
  - `configDB.ts`: Configuración detallada de la base de datos.

- **/middlewares/**: Middlewares para validar datos.
  - `validarCampos.ts`: Middleware que maneja errores de validación.

- **/models/**: Definiciones de entidades para la base de datos usando TypeORM.
  - `cursoModels.ts`: Modelo de Curso.
  - `estudianteModels.ts`: Modelo de Estudiante.
  - `inscripcionModels.ts`: Modelo de Inscripción.
  - `profesorModels.ts`: Modelo de Profesor.

- **/routes/**: Define las rutas de la API.
  - `cursoRoutes.ts`: Rutas para las operaciones CRUD de cursos.
  - `estudianteRoutes.ts`: Rutas para las operaciones CRUD de estudiantes.
  - `inscripcionRoutes.ts`: Rutas para las operaciones CRUD de inscripciones.
  - `profesorRoutes.ts`: Rutas para las operaciones CRUD de profesores.

- **/views/**: Carpeta que contiene las vistas del proyecto generadas con Pug.
  - `index.pug`: Página principal del proyecto.
  - `estudiantes.pug`: Vista para gestionar estudiantes.
  - `cursos.pug`: Vista para gestionar cursos.
  - `profesores.pug`: Vista para gestionar profesores.
  - `inscripciones.pug`: Vista para gestionar inscripciones.

- **/styles/**: Archivos CSS que contienen los estilos del proyecto.
  - `styles.css`: Archivo con los estilos base utilizando Tailwind CSS.

## 📜 Modelos de Entidades
Cada modelo está ubicado en la carpeta `/models` y corresponde a una entidad de la base de datos:

- `cursoModels.ts`: Define el esquema de la tabla de cursos con sus relaciones.
- `estudianteModels.ts`: Esquema de estudiantes con atributos como nombre, edad y relaciones.
- `inscripcionModels.ts`: Relaciona estudiantes y cursos para gestionar inscripciones.
- `profesorModels.ts`: Modelo para gestionar a los profesores y sus cursos asignados.

## 🎨 Pug - Motor de Plantillas
Pug es un motor de plantillas que simplifica la escritura de HTML. Permite estructurar vistas de manera eficiente con una sintaxis minimalista, facilitando la creación de interfaces de usuario dinámicas y atractivas.

### 📑 Archivos Pug en el Proyecto
Los archivos `.pug` están ubicados en la carpeta `/views/` y corresponden a cada vista específica:

- `index.pug`: Página principal del proyecto.
- `estudiantes.pug`: Vista para gestionar estudiantes.
- `cursos.pug`: Vista para gestionar cursos.
- `profesores.pug`: Vista para gestionar profesores.
- `inscripciones.pug`: Vista para gestionar inscripciones.

### 🔧 Configuración de Pug en Express
Para habilitar Pug como motor de plantillas en Express, se debe configurar en el archivo `index.ts`:

```typescript
import express from 'express';
const app = express();

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Ruta de ejemplo que renderiza la vista de estudiantes
app.get('/estudiantes', (req, res) => {
  res.render('estudiantes', { titulo: 'Gestión de Estudiantes' });
});


### 🔧 **Configuración TypeORM**
1. **Conexión a la base de datos**:  
   La conexión se establece en el archivo `conexion.ts`, que contiene la configuración básica para conectarse a la base de datos MySQL utilizando `mysql2/promise`.

   ```typescript
   import { createConnection } from "typeorm";
   
   createConnection({
     type: "mysql",
     host: "localhost",
     port: 3306,
     username: "root",
     password: "password",
     database: "universidad_db",
     entities: [__dirname + "/../models/*.ts"],
     synchronize: true,
   }).then(() => console.log("🚀 Base de datos conectada exitosamente!"))
     .catch(error => console.log("❌ Error al conectar la base de datos: ", error));


## 🗂️ **Estructura del Proyecto**
El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)**, organizando el código en capas claras que facilitan el mantenimiento y la extensión. La integración con **TypeORM** hace que las interacciones con la base de datos sean más eficientes y el flujo de trabajo más dinámico.

### 🔧 **1. `/src/` - Código Fuente en TypeScript**
- **/controller/**: Controladores para manejar la lógica de cada entidad.
  - `cursoController.ts`: Gestión de cursos.
  - `estudianteController.ts`: Gestión de estudiantes.
  - `inscripcionController.ts`: Gestión de inscripciones (relaciones curso-estudiante).
  - `profesorController.ts`: Gestión de profesores.

- **/db/**: Configuración para conectar a la base de datos.
  - `conexion.ts`: Conexión con MySQL utilizando `mysql2/promise`.
  - `configDB.ts`: Configuración detallada de la base de datos.

- **/middlewares/**: Middleware para validación de datos.
  - `validarCampos.ts`: Middleware para manejar errores de validación.

- **/models/**: Modelos de datos definidos con TypeORM.
  - `cursoModels.ts`: Modelo de Curso.
  - `estudianteModels.ts`: Modelo de Estudiante.
  - `inscripcionModels.ts`: Modelo de Inscripción.
  - `profesorModels.ts`: Modelo de Profesor.

- **/routes/**: Define las rutas de la API.
  - `cursoRoutes.ts`: Rutas para las operaciones CRUD de cursos.
  - `estudianteRoutes.ts`: Rutas para las operaciones CRUD de estudiantes.
  - `inscripcionRoutes.ts`: Rutas para las operaciones CRUD de inscripciones.
  - `profesorRoutes.ts`: Rutas para las operaciones CRUD de profesores.

### 📁 **2. `/build/` - Código Compilado a JavaScript**
Esta carpeta contiene el código listo para ser ejecutado en producción.

### 💻 **3. `/views/` - Vistas del Proyecto**
Carpeta con las vistas de la aplicación, divididas por entidad:

- `index.html`: Página principal.
- `estudiantes.html`: Vista para gestionar estudiantes.
- `cursos.html`: Vista para gestionar cursos.
- `profesores.html`: Vista para gestionar profesores.
- `inscripciones.html`: Vista para gestionar inscripciones.

También incluye la lógica de las vistas en archivos JavaScript y los estilos CSS:

- `estudiantes.js`: Lógica de la vista de estudiantes.
- `cursos.js`: Lógica de la vista de cursos.
- `profesores.js`: Lógica de la vista de profesores.
- `inscripciones.js`: Lógica de la vista de inscripciones.
- `styles.css`: Estilos generales para las vistas.

### 🛠️ **4. `/database/` - Configuración de la Base de Datos**
- `BD Tablas.sql`: Script SQL para crear las tablas.
- `BD Datos.sql`: Script SQL para poblar las tablas con datos de ejemplo.

## 🔗 **Endpoints de la API**
Listado de los endpoints para gestionar cada entidad de manera intuitiva:

### 🧑‍🎓 **Estudiantes**
- **GET** `/api/estudiantes`: Obtiene lista de estudiantes.
- **GET** `/api/estudiantes/:id`: Obtiene un estudiante por ID.
- **POST** `/api/estudiantes`: Crea un nuevo estudiante.
- **PUT** `/api/estudiantes/:id`: Actualiza un estudiante.
- **DELETE** `/api/estudiantes/:id`: Elimina un estudiante.

### 👨‍🏫 **Profesores**
- **GET** `/api/profesores`: Obtiene lista de profesores.
- **GET** `/api/profesores/:id`: Obtiene un profesor por ID.
- **POST** `/api/profesores`: Crea un nuevo profesor.
- **PUT** `/api/profesores/:id`: Actualiza un profesor.
- **DELETE** `/api/profesores/:id`: Elimina un profesor.

### 📚 **Cursos**
- **GET** `/api/cursos`: Obtiene lista de cursos.
- **GET** `/api/cursos/:id`: Obtiene un curso por ID.
- **POST** `/api/cursos`: Crea un nuevo curso.
- **PUT** `/api/cursos/:id`: Actualiza un curso.
- **DELETE** `/api/cursos/:id`: Elimina un curso.

### 🔗 **Inscripciones (Relación Curso-Estudiante)**
- **GET** `/api/inscripciones`: Lista de todas las inscripciones.
- **GET** `/api/inscripciones/cursos/:id`: Alumnos inscriptos en un curso.
- **GET** `/api/inscripciones/estudiante/:estudiante_id`: Cursos de un estudiante.
- **POST** `/api/inscripciones`: Crear una inscripción.
- **PUT** `/api/inscripciones/cursos/:id/estudiante/:estudiante_id`: Actualiza detalles de inscripción.
- **DELETE** `/api/inscripciones/:id/estudiante/:estudiante_id`: Eliminar una inscripción.

## 📝 **Conclusión y Notas Finales**
Este proyecto es el resultado de muchas horas de dedicación y aprendizaje continuo. Es más que un simple trabajo académico; representa la búsqueda constante de mejorar y aprender cada día. Si encuentras algún error o consideras que algo se puede optimizar, ¡no dudes en dejar tus comentarios! 💬🔧

> **Nota**: 🤓 Estoy en constante aprendizaje y me encantaría recibir cualquier tipo de sugerencia o corrección constructiva. ¡Cada feedback es un nuevo paso hacia un mejor desarrollo! 🚀

Gracias por interesarte en este proyecto, y si te ha inspirado o ayudado en algo, ¡no dudes en explorar más y contribuir! 🙌💻
