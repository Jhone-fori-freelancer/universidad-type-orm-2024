//npm init -y                 package.json
//npm i typescript -D         complilador dependencia de desarrollo
//tsc --init                  inicilizamos para typescript tsconfig.json 
//npm i ts-node-dev           compilacion automatica con js  
//modifico el script
//npm i express               
//npm i cors
//npm i morgan                 login de lo que se pida a la API
//
//npm i @types/express -D      le dice los tipos de datos para que soporte los datos
//npm i @types/cors -D         para que typescripct trabaje con cors
//npm i @types/morgan -D       para que typescript trabaje con morgan

//TYPEORM
//npm install typeorm --save
//npm install reflect-metadata --save
//npm install @types/node --save-dev

//npm install mysql2 --save
//ò e installa todo lo del package
//npm install   instala todo lo del package

// npm run dev  para levantar el servidor

import app from './app';

import { initializeDatabase } from './db/conexion';

const port =6505;

async function main(){
    try {
        await initializeDatabase(); 
        console.log('Base de datos conectada');

        app.listen(6505, () => {
            console.log(`Servidor activo en el puerto ${port}`);
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error al conectar con la base de datos:', err.message);
        }
    }
}

main();
