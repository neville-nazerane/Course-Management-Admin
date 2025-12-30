import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Teacher } from "../models/teacher";
import { firstValueFrom } from "rxjs";
import { setThrowInvalidWriteToSignalError } from "@angular/core/primitives/signals";
import { Course } from "../models/course";
import { StudyProgram } from "../models/study-program";
import { Student } from "../models/student";
import { CourseSectionDisplay } from "../models/course-section-display";
import { CourseSection } from "../models/course-section";
import { Enrollment } from "../models/enrollment";
import { EnrollmentDisplay } from "../models/enrollment-display";

@Injectable({providedIn: 'root'})
export class ApiConsumer {

    private http = inject(HttpClient);

    //#region Teachers

    public getTeachers(): Promise<Teacher[]> {
        return this.get<Teacher[]>('teachers');
    }

    public getTeacher(id: number): Promise<Teacher> {
        return this.get<Teacher>(`teacher/${id}`);
    }

    public createTeacher(model: Teacher): Promise<Teacher> {
        return this.post<Teacher>('teacher', model);
    }

    public updateTeacher(model: Teacher): Promise<void> {
        return this.put<void>('teacher', model);
    }

    public deleteTeacher(id: number): Promise<void> {
        return this.delete<void>(`teacher/${id}`);
    }

    public getCourseSectionsByTeacherId(teacherId: number): Promise<CourseSectionDisplay[]> {
        return this.get<CourseSectionDisplay[]>(`teacher/${teacherId}/courseSections`);
    }

    //#endregion

    //#region Courses

    public getCourses(): Promise<Course[]> {
        return this.get<Course[]>('courses');
    }

    public getCourse(id: number): Promise<Course> {
        return this.get<Course>(`course/${id}`);
    }

    public createCourse(model: Course): Promise<Course> {
        return this.post<Course>('course', model);
    }

    public updateCourse(model: Course): Promise<void> {
        return this.put<void>('course', model);
    }

    public deleteCourse(id: number): Promise<void> {
        return this.delete<void>(`course/${id}`);
    }

    //#endregion

    //#region Study Programs

    public getStudyPrograms(): Promise<StudyProgram[]> {
        return this.get<StudyProgram[]>('study-programs');
    }

    public getStudyProgram(id: number): Promise<StudyProgram> {
        return this.get<StudyProgram>(`study-program/${id}`);
    }

    public createStudyProgram(model: StudyProgram): Promise<StudyProgram> {
        return this.post<StudyProgram>('study-program', model);
    }

    public updateStudyProgram(model: StudyProgram): Promise<void> {
        return this.put<void>('study-program', model);
    }

    public deleteStudyProgram(id: number): Promise<void> {
        return this.delete<void>(`study-program/${id}`);
    }

    //#endregion

    //#region Students

    public getStudents(): Promise<Student[]> {
        return this.get<Student[]>('students');
    }

    public getStudent(id: number): Promise<Student> {
        return this.get<Student>(`student/${id}`);
    }

    public createStudent(model: Student): Promise<Student> {
        return this.post<Student>('student', model);
    }

    public updateStudent(model: Student): Promise<void> {
        return this.put<void>('student', model);
    }

    public getStudentEnrollments(studentId: number): Promise<EnrollmentDisplay[]> {
        return this.get<EnrollmentDisplay[]>(`student/${studentId}/enrollments`);
    }

    public deleteStudent(id: number): Promise<void> {
        return this.delete<void>(`student/${id}`);
    }

    //#endregion

    //#region Course Sections

    public getCourseSectionsByCourseId(courseId: number): Promise<CourseSectionDisplay[]> {
        return this.get<CourseSectionDisplay[]>(`course/${courseId}/sections`);
    }

    public getCourseSection(courseSectionId: number): Promise<CourseSectionDisplay> {
        return this.get<CourseSectionDisplay>(`course/section/${courseSectionId}`);
    }

    public addCourseSection(model: CourseSection): Promise<number> {
        return this.post<number>('course/section', model);
    }

    public patchCourseSection(courseSectionId: number, sectionCode: string): Promise<void> {
        return this.patch<void>(`course/section/${courseSectionId}?sectionCode=${sectionCode}`);
    }

    public deleteCourseSection(courseSectionId: number): Promise<void> {
        return this.delete<void>(`course/section/${courseSectionId}`);
    }

    //#endregion

    //#region Enrollments

    public enroll(model: Enrollment): Promise<number> {
        return this.post<number>('course/enrollment', model);
    }

    public getCourseEnrollments(courseSectionId: number): Promise<EnrollmentDisplay[]> {
        return this.get<EnrollmentDisplay[]>(`course/section/${courseSectionId}/enrollments`);
    }

    public deleteEnrollment(id: number): Promise<void> {
        return this.delete<void>(`course/enrollment/${id}`);
    }

    public getEnrollment(id: number) : Promise<EnrollmentDisplay> {
        return this.get<EnrollmentDisplay>(`course/enrollment/${id}`);
    }

    //#endregion




    get<T>(url: string): Promise<T> {
        return firstValueFrom(this.http.get<T>(url));
    }
    
    post<T>(url: string, body: unknown): Promise<T> {
        return firstValueFrom(this.http.post<T>(url, body));
    }

    put<T>(url: string, body: unknown): Promise<T> {
        return firstValueFrom(this.http.put<T>(url, body));
    }

    delete<T>(url: string): Promise<T> {
        return firstValueFrom(this.http.delete<T>(url));
    }

    patch<T>(url: string, body?: unknown): Promise<T> {
        return firstValueFrom(this.http.patch<T>(url, body));
    }



}