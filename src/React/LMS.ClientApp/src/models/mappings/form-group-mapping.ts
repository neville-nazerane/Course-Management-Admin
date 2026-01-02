import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Teacher } from "../teacher";
import { DateUtils } from "../../utils/date-utils";
import { StudyProgram } from "../study-program";
import { Course } from "../course";
import { Student } from "../student";
import { CourseSection } from "../course-section";

export class FormGroupMappings {

    static createTeacher(data?: Teacher): FormGroup {
        const id = FormGroupMappings.control(data?.id ?? 0);

        const firstName = FormGroupMappings.control(
            data?.firstName ?? '',
            Validators.required,
            Validators.maxLength(100)
        );

        const lastName = FormGroupMappings.control(
            data?.lastName ?? '',
            Validators.required,
            Validators.maxLength(100)
        );

        const title = FormGroupMappings.control(
            data?.title ?? '',
            Validators.maxLength(50)
        );

        const dateOfBirth = FormGroupMappings.control(
            DateUtils.toDateInput(data?.dateOfBirth),
            Validators.required
        );

        const hiredOn = FormGroupMappings.control(
            DateUtils.toDateInput(data?.hiredOn, new Date()),
            Validators.required
        );

        return new FormGroup({id,firstName,lastName,title,dateOfBirth,hiredOn});
    }

    static createCourse(data?: Course): FormGroup {
        const id = FormGroupMappings.control(data?.id ?? 0);

        const name = FormGroupMappings.control(
            data?.name ?? '',
            Validators.required,
            Validators.maxLength(150)
        );

        const code = FormGroupMappings.control(
            data?.code ?? '',
            Validators.required,
            Validators.maxLength(20)
        );

        const description = FormGroupMappings.control(
            data?.description ?? '',
            Validators.maxLength(500)
        );

        return new FormGroup({ id, name, code, description });
    }

    static createStudyProgram(data?: StudyProgram): FormGroup {
        const id = FormGroupMappings.control(data?.id ?? 0);

        const name = FormGroupMappings.control(
            data?.name ?? '',
            Validators.required,
            Validators.maxLength(150)
        );

        const code = FormGroupMappings.control(
            data?.code ?? '',
            Validators.required,
            Validators.maxLength(20)
        );

        const description = FormGroupMappings.control(
            data?.description ?? '',
            Validators.maxLength(500)
        );

        return new FormGroup({ id, name, code, description });
    }

    static createStudent(data?: Student): FormGroup {
        const id = FormGroupMappings.control(data?.id ?? 0);

        const firstName = FormGroupMappings.control(
            data?.firstName ?? '',
            Validators.required,
            Validators.maxLength(100)
        );

        const lastName = FormGroupMappings.control(
            data?.lastName ?? '',
            Validators.required,
            Validators.maxLength(100)
        );

        const dateOfBirth = FormGroupMappings.control(
            DateUtils.toDateInput(data?.dateOfBirth),
            Validators.required
        );

        const enrolledOn = FormGroupMappings.control(
            DateUtils.toDateInput(data?.enrolledOn, new Date()),
            Validators.required
        );

        const studyProgramId = FormGroupMappings.control(
            data?.studyProgramId ?? null,
            Validators.required
        );

        return new FormGroup({ id, firstName, lastName, dateOfBirth, enrolledOn, studyProgramId });
    }

    static createCourseSection(data?: CourseSection): FormGroup {
        const id = FormGroupMappings.control(data?.id ?? 0);

        const courseId = FormGroupMappings.control(
            data?.courseId ?? null,
            Validators.required
        );

        const teacherId = FormGroupMappings.control(
            data?.teacherId ?? null,
            Validators.required
        );

        const sectionCode = FormGroupMappings.control(
            data?.sectionCode ?? '',
            Validators.required,
            Validators.maxLength(20)
        );

        return new FormGroup({ id, courseId, teacherId, sectionCode });
    }


    private static control<T>(value: T, ...validators: ValidatorFn[]): FormControl<T | null> {
        return new FormControl(value, { validators });
    }

}
