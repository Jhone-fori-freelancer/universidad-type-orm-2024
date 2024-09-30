import dotenv from 'dotenv';
dotenv.config();

import { DataSource } from "typeorm";
import { createConnection } from "mysql2/promise"; 
import { Estudiante } from "../models/estudianteModel";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { CursoEstudiante } from "../models/cursoEstudianteModel";

const port: number = process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10) : 3306;

async function createDatabaseIfNotExists() {
    const connection = await createConnection({
       host: process.env.BD_HOST,
       port,
       user: process.env.BD_USER,
       password: process.env.BD_PASWORD, 
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.BD_NOMBRE}`);
    await connection.end();
}

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.BD_HOST,
    port,
    username: process.env.BD_USER,
    password: process.env.BD_PASWORD,
    database: process.env.BD_NOMBRE,
    entities: [Estudiante, Curso, Profesor, CursoEstudiante],
    synchronize: false,  // solo para desarrollo; elimina esto en producción
    logging: true
});

export async function initializeDatabase() {
    await createDatabaseIfNotExists();
    await AppDataSource.initialize();
}
