import { AbstractControl, FormGroup } from "@angular/forms";

export class FormUtils {

  static getErrors(control: AbstractControl | null): string[] {

    if (!control || control.untouched || !control.errors) {
      return [];
    }

    const errors: string[] = [];

    if (control.errors['required']) {
      errors.push('This field is required.');
    }

    if (control.errors['maxlength']) {
      const max = control.errors['maxlength'].requiredLength;
      errors.push(`Maximum length is ${max}.`);
    }

    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      errors.push(`Minimum length is ${min}.`);
    }

    if (control.errors['email']) {
      errors.push('Invalid email address.');
    }

    return errors;
  }

}
