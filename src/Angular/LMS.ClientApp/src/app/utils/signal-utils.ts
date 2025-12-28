import { WritableSignal } from "@angular/core";

export class SignalUtils {

    static pushAndUpdate<T>(signal: WritableSignal<T[]>, item: T) {
        signal.update(arr => [...arr, item]);
    }

    static replaceById<T extends { id: number }>(signal: WritableSignal<T[]>, updated: T) {
        signal.update(items =>
            items.map(i => i.id === updated.id ? updated : i)
        );
    }

    static removeById<T extends { id: number }>(signal: WritableSignal<T[]>, id: number) {
        signal.update(items => items.filter(i => i.id !== id));
    }


}