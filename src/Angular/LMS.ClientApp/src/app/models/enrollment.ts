
export interface Enrollment {
  id: number;
  studentId: number | null;
  courseSectionId: number | null;
  enrolledOn: Date;
}
