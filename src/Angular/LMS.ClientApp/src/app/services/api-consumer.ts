import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiConsumer {

    private http = inject(HttpClient);

    public getTeachers() {
        this.http.get('teachers').subscribe(c => console.log(c));
    }

}