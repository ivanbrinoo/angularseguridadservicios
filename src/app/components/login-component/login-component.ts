import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceEmpleados } from '../../services/service.empleados';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login-component',
  standalone: false,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  @ViewChild("cajausuario") cajausuario!: ElementRef
  @ViewChild("cajapassword") cajapassword!: ElementRef
  mensaje!: string
  constructor(
    private _service: ServiceEmpleados,
    private _cdr: ChangeDetectorRef
  ) {}

  async validarUsuario(): Promise<void> {
    let usuario = this.cajausuario.nativeElement.value
    let password = this.cajapassword.nativeElement.value
    let login = new Login(usuario, password )
    await this._service.loginPerfilAsync(login)
    this.mensaje = "Usuario correcto"
    this._cdr.detectChanges()
    }
}
