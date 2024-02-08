import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../../services/sesion.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  
  mensajeError: string = '';
  nombreUsusario: string = '';
  claveUsuario: string = '';


  constructor(private router: Router, private sesionService: SesionService, private crud: CrudService) {
    if (this.sesionService.sesionIniciada()) {
      this.router.navigate(['/main']);
      
    }
  }

  login() {

    this.crud.create('login', {
      usuario: this.nombreUsusario,
      clave: this.claveUsuario     
    }).subscribe((respuesta: any) => {
      if (respuesta.success) {
        this.mensajeError = '';
        this.sesionService.iniciarSesion(respuesta.data);
        this.router.navigate(['/main']);
      } else {
        this.mensajeError = respuesta.error;
      }
    })
    // if (this.nombreUsusario =='a' && this.claveUsuario == 'a') {
    //   this.mensajeError = '';
    //   this.sesionService.iniciarSesion({
    //     id_usuario: 1,
    //     nombre: this.nombreUsusario
    //   });
    //   this.router.navigate(['/main']);
    // } else {
    //   this.mensajeError = 'Usuario o contraseña incorrecta';
      
    // }
  }

  cargarLogup() {
    this.router.navigate(['/logup']);
  }
}
