

export class DataUtils {

    static cleanDate(d: Date) : string {
        if (!isNaN(Date.parse(d.toString())))
            return new Date(d).toISOString().slice(0, 10);
        return new Date().toISOString().slice(0, 10);
    }

}