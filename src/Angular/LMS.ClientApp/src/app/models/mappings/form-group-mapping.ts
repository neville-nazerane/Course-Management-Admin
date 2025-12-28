import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Teacher } from "../teacher";
import { DateUtils } from "../../utils/date-utils";
import { StudyProgram } from "../study-program";
import { Course } from "../course";

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
        return new FormGroup({
            id: new FormControl(data?.id ?? 0),
            name: new FormControl(data?.name ?? ''),
            code: new FormControl(data?.code ?? ''),
            description: new FormControl(data?.description ?? '')
        });
    }

    static createStudyProgram(data?: StudyProgram): FormGroup {
        return new FormGroup({
            id: new FormControl(data?.id ?? 0),
            name: new FormControl(data?.name ?? ''),
            code: new FormControl(data?.code ?? ''),
            description: new FormControl(data?.description ?? '')
        });
    }


    private static control<T>(value: T, ...validators: ValidatorFn[]): FormControl<T | null> {
        return new FormControl(value, { validators });
    }


}