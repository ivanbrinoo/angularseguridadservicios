import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Empleado } from "../models/empleado";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { Login } from "../models/login";

@Injectable()

export class ServiceEmpleados {
    constructor (
        private _http: HttpClient
    ) {}

    async getEmpleadosAsync(): Promise<Empleado[]> {
        let request = "api/EmpleadosAuth"
        let url = environment.apiejemplos + request
        return firstValueFrom(
            this._http.get<Empleado[]>(url)
        )
    }

    async getPerfilAsync(): Promise<Empleado> {
        let request = "api/EmpleadosAuth/PerfilAuth"
        let url = environment.apiejemplos + request
        return firstValueFrom(
            this._http.get<Empleado>(url)
        )
    }

    async loginPerfilAsync(login: Login): Promise<any> {
        let request = "api/EmpleadosAuth/PerfilAuth"
        let url = environment.apiejemplos + request
        let header = new HttpHeaders().set("content-type", "application/json")
        return firstValueFrom(
            this._http.post (url, login, {headers: header})

        )
    }
}