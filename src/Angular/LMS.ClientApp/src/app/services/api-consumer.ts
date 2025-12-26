import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Teacher } from "../models/teacher";
import { firstValueFrom } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiConsumer {

    private http = inject(HttpClient);

    public getTeachers(): Promise<Teacher[]> {
        return this.get<Teacher[]>('teachers');
    }

    get<T>(url: string): Promise<T> {
        return firstValueFrom(this.http.get<T>(url));
    }

}