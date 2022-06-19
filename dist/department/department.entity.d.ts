import { Section } from 'src/section/section.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Course } from 'src/course/course.entity';
import { Classroom } from 'src/classroom/classroom.entity';
export declare class Department {
    id: string;
    name: string;
    sections?: Section[];
    teachers?: Teacher[];
    courses?: Course[];
    classrooms?: Classroom[];
    createdAt: Date;
    updatedAt: Date;
}
