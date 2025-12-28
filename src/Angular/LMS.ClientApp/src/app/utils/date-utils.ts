

export class DateUtils {

 static toDateInput(value?: Date | string | null, defaultValue?: Date | string): string | null {
    const v = value ?? defaultValue;
    if (!v) return null;
    return new Date(v).toISOString().split('T')[0];
  }

}
