import { Entity, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { Estudiante } from './estudianteModel';
import { Curso } from './cursoModel';

@Entity('cursos_estudiantes')
export class CursoEstudiante {
    @PrimaryColumn()
    public estudiante_id: number;

    @PrimaryColumn()
    public curso_id: number;

    @Column({ type: 'float' , default:  0 })
    public nota: number; 

    @Column({ type: 'date', default: () => 'CURRENT_DATE' }) 
    public fecha: Date;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.cursos)
    @JoinColumn({ name: 'estudiante_id' })
    public estudiante: Estudiante;

    @ManyToOne(() => Curso, (curso) => curso.estudiantes)
    @JoinColumn({ name: 'curso_id' })
    public curso: Curso;
}
