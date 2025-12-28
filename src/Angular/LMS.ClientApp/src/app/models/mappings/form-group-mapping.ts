import { FormControl, FormGroup } from "@angular/forms";
import { Teacher } from "../teacher";
import { DateUtils } from "../../utils/date-utils";
import { StudyProgram } from "../study-program";
import { Course } from "../course";

export class FormGroupMappings {

    static createTeacher(data?: Teacher): FormGroup {
        return new FormGroup({
            id: new FormControl(data?.id ?? 0),
            title: new FormControl(data?.title ?? ''),
            firstName: new FormControl(data?.firstName ?? ''),
            lastName: new FormControl(data?.lastName ?? ''),
            dateOfBirth: new FormControl(DateUtils.toDateInput(data?.dateOfBirth)),
            hiredOn: new FormControl(DateUtils.toDateInput(data?.hiredOn, new Date()))
        });
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

}