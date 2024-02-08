import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-logup',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './logup.component.html',
  styleUrl: './logup.component.css'
})
export class LogupComponent {

  mensajeError: string = '';
  
  constructor(
    private router: Router,
    private crud: CrudService) { }
  
  cargarLogin() {
    this.router.navigate(['/login']);
  }


  registrar(logupForm: any) {
    let datos = {...logupForm.value};
    delete datos.confirmarClave;
    this.crud.create('register', datos)
    .subscribe((respuesta: any) => {
      if (respuesta.success) {
        this.router.navigate(['/login']);
      }else{
        this.mensajeError = respuesta.error;
      }
    })
    logupForm.reset();
    
  }
}
