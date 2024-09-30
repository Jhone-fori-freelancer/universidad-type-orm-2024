# 📚 **Proyecto Universidad**

## 🎯 **Descripción**
¡Bienvenidos al **Proyecto Universidad**! 🏫✨  
Esta aplicación web está diseñada para gestionar información universitaria de manera eficiente, abarcando la administración de **estudiantes**, **profesores** y **cursos**. 

💡 **¿Por qué este proyecto?**  
Fue desarrollado con pasión y dedicación como parte de la asignatura *"Desarrollo de Aplicaciones Web"*. No solo busca cumplir con requisitos académicos, sino que representa un esfuerzo personal por crear una herramienta funcional que refleje conocimientos aplicados en tecnologías modernas.

## 🚀 **Tecnologías Principales**
Este proyecto combina herramientas poderosas para ofrecer un entorno ágil, seguro y escalable:

- 🔹 **TypeScript**: Lenguaje principal, con tipado fuerte y características avanzadas.
- 🔹 **TypeORM**: ORM para facilitar la interacción con bases de datos relacionales.
- 🔹 **Express.js**: Framework flexible y minimalista para construir la API REST.
- 🔹 **MySQL**: Base de datos relacional para almacenar y gestionar la información.
- 🔹 **Node.js**: Entorno de ejecución de JavaScript para el lado del servidor.
- 🔹 **express-validator**: Middleware para validar datos en las rutas.
- 🔹 **sweetalert2**: Biblioteca para mensajes de alerta amigables en el frontend.

## 📐 **Estructura del Proyecto**
El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)**, organizando el código en capas claras que facilitan el mantenimiento y la extensión. La integración con **TypeORM** hace que las interacciones con la base de datos sean más eficientes y el flujo de trabajo más dinámico.

### 🏗️ **TypeORM - Gestión de Base de Datos**
**TypeORM** es una herramienta esencial en este proyecto para interactuar con la base de datos relacional. Gracias a su estructura flexible y orientada a objetos, permite trabajar con bases de datos de manera intuitiva y eficiente. A continuación, se describe cómo se utiliza en el proyecto:

- **Modelos y Entidades**: Define las tablas y sus relaciones directamente en el código con anotaciones de TypeScript.
- **Migraciones**: Facilita la gestión de cambios en la estructura de la base de datos (añadir, modificar o eliminar tablas/columnas).
- **Query Builders**: Permite construir consultas complejas sin necesidad de escribir SQL puro.

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
