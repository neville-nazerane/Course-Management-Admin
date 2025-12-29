import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Teacher } from "../models/teacher";
import { firstValueFrom } from "rxjs";
import { setThrowInvalidWriteToSignalError } from "@angular/core/primitives/signals";
import { Course } from "../models/course";

@Injectable({providedIn: 'root'})
export class ApiConsumer {

    private http = inject(HttpClient);

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

}