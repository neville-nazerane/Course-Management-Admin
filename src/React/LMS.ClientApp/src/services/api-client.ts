import type { Course } from "../models/course";
import type { StudyProgram } from "../models/study-program";
import type { Student } from "../models/student";
import type { CourseSectionDisplay } from "../models/course-section-display";
import type { CourseSection } from "../models/course-section";
import type { Enrollment } from "../models/enrollment";
import type { EnrollmentDisplay } from "../models/enrollment-display";
import type { Teacher } from "../models/teacher";
import axios from "axios";
import type { AxiosInstance } from "axios";

export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' }
    });
  }

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

  public getCourseSectionsByTeacherId(
    teacherId: number
  ): Promise<CourseSectionDisplay[]> {
    return this.get<CourseSectionDisplay[]>(
      `teacher/${teacherId}/courseSections`
    );
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

  public getStudentEnrollments(
    studentId: number
  ): Promise<EnrollmentDisplay[]> {
    return this.get<EnrollmentDisplay[]>(
      `student/${studentId}/enrollments`
    );
  }

  public deleteStudent(id: number): Promise<void> {
    return this.delete<void>(`student/${id}`);
  }

  //#endregion

  //#region Course Sections

  public getCourseSectionsByCourseId(
    courseId: number
  ): Promise<CourseSectionDisplay[]> {
    return this.get<CourseSectionDisplay[]>(
      `course/${courseId}/sections`
    );
  }

  public getCourseSection(
    courseSectionId: number
  ): Promise<CourseSectionDisplay> {
    return this.get<CourseSectionDisplay>(
      `course/section/${courseSectionId}`
    );
  }

  public addCourseSection(model: CourseSection): Promise<number> {
    return this.post<number>('course/section', model);
  }

  public patchCourseSection(
    courseSectionId: number,
    sectionCode: string
  ): Promise<void> {
    return this.patch<void>(
      `course/section/${courseSectionId}?sectionCode=${sectionCode}`
    );
  }

  public deleteCourseSection(courseSectionId: number): Promise<void> {
    return this.delete<void>(
      `course/section/${courseSectionId}`
    );
  }

  //#endregion

  //#region Enrollments

  public enroll(model: Enrollment): Promise<number> {
    return this.post<number>('course/enrollment', model);
  }

  public getCourseEnrollments(
    courseSectionId: number
  ): Promise<EnrollmentDisplay[]> {
    return this.get<EnrollmentDisplay[]>(
      `course/section/${courseSectionId}/enrollments`
    );
  }

  public deleteEnrollment(id: number): Promise<void> {
    return this.delete<void>(`course/enrollment/${id}`);
  }

  public getEnrollment(id: number): Promise<EnrollmentDisplay> {
    return this.get<EnrollmentDisplay>(`course/enrollment/${id}`);
  }

  //#endregion

  // ===== private helpers =====

  private get<T>(url: string): Promise<T> {
    return this.http.get<T>(url).then(r => r.data);
  }

  private post<T>(url: string, data?: unknown): Promise<T> {
    return this.http.post<T>(url, data).then(r => r.data);
  }

  private put<T>(url: string, data?: unknown): Promise<T> {
    return this.http.put<T>(url, data).then(r => r.data);
  }

  private patch<T>(url: string): Promise<T> {
    return this.http.patch<T>(url).then(r => r.data);
  }

  private delete<T>(url: string): Promise<T> {
    return this.http.delete<T>(url).then(r => r.data);
  }
  
}
