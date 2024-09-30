import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
         UpdateDateColumn, ManyToMany, JoinTable  } from "typeorm";
import { Curso } from "./cursoModel";

@Entity('estudiantes')
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;
    
    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToMany(() => Curso)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'curso_id', referencedColumnName: 'id' }
    })
    cursos: Curso[];
}
