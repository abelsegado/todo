import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private usuario:any=null;

  constructor() {
    if (sessionStorage.getItem('user')) {
      this.usuario=JSON.parse(sessionStorage.getItem('user')||"null");
      
    }
   }

  iniciarSesion(user:any){
    this.usuario=user;
    sessionStorage.setItem('user',JSON.stringify(this.usuario));

  }

  finalizarSesion(){
    this.usuario=null;
    sessionStorage.removeItem('user');
  }

  obtenerSesion(){
    return this.usuario;
  }

  sesionIniciada(){
    return this.usuario!=null
  }
}
