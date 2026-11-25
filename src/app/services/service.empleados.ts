import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
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
        let token = localStorage.getItem("TOKEN")
        console.log(token)
        let header = new HttpHeaders().set("Authorization", "bearer " + token)
        return firstValueFrom(
            this._http.get<Empleado>(url, {headers: header})
        )
    }

    async loginPerfilAsync(login: Login): Promise<any> {
        let request = "api/AuthEmpleados/login";
        let url = environment.apiejemplos + request;
        let header = new HttpHeaders().set("content-type", "application/json");

        try {
            // Agregamos { observe: 'response' } para recibir todo el objeto HttpResponse
            let data: any = await firstValueFrom(
            this._http.post<any>(url, login, { 
                headers: header, 
                observe: 'response' 
            })
            );
            console.log(data)
            console.log(data.body.response)
            // Ahora puedes ver el status (ej. 200), headers y el cuerpo (response.body)
            return data.body.response

        } catch (error) {
            console.error("Fallo en loginPerfilAsync:", error);
            throw error;
        }
        }

}