import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SinoPipe } from "../../pipes/sino.pipe";
import { Router } from '@angular/router';
import { SesionService } from '../../services/sesion.service';
import { CrudService } from '../../services/crud.service';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [FormsModule, SinoPipe, UpperCasePipe]
})


export class MainComponent implements OnInit {
  
  
  constructor(private router: Router, private sesionService: SesionService, private crud: CrudService) {
    this.crud.read('tareas',this.sesionService.obtenerSesion().id_usuario)
    .subscribe((res:any)=>{
      if (res.success) {
        this.listaTareas = res.data;
      }else{
        this.listaTareas = [];
      }
      this.ngOnInit();
      
    })
   }

  nombreUsuario = '';
  totalCompletadas = signal(0);
  totalPendientes = signal(0);
  nuevaTarea='';
  modificaTarea = [{
    id_tarea: 0,
    nombre: '',
    completada: false,
    editada: false
  }]
  checkCompletadas=false;
  
  listaTareas: any[] = [];

  ngOnInit(): void {
    this.nombreUsuario = this.sesionService.obtenerSesion().nombre;
    this.actualizarTotales();
  }

  cerrarSesion(){
    this.sesionService.finalizarSesion();
    this.router.navigate(['/login']);
  }
  eliminarTarea(item: any) {
    this.crud.delete('tareas',item.id_tarea)
    .subscribe((res:any)=>{
      if (res.success) {
        this.listaTareas = this.listaTareas.filter(tarea => tarea.id_tarea != item.id_tarea);
        this.actualizarTotales();
      }
    })
  }

  editarTarea(item: any) {
    this.modificaTarea = [{
      id_tarea: item.id_tarea,
      nombre: item.nombre,
      completada: item.completada,
      editada: true
    }]
    console.log(this.modificaTarea);
    
  }

  putTarea() {
    this.crud.update('nombre_tareas',this.modificaTarea[0].id_tarea,{nombre: this.modificaTarea[0].nombre})
    .subscribe((res:any)=>{
      if (res.success) {
        this.modificaTarea[0].editada = false;
        console.log(this.listaTareas);
        //modifica la listaTareas por la modificacion
        this.listaTareas = this.listaTareas.map(tarea => {
          if (tarea.id_tarea == this.modificaTarea[0].id_tarea) {
            return this.modificaTarea[0];
          }
          return tarea;
        })
        this.actualizarTotales();
      }
    })

    
  }


  completarTarea(item: any) {
    this.crud.update('tareas',item.id_tarea,{completada: true})
    .subscribe((res:any)=>{
      if (res.success) {
        item.completada = true;
        this.actualizarTotales();
      }
    })
  }

  actualizarTotales() {
    this.totalCompletadas.set(this.listaTareas.filter(tarea => tarea.completada).length);
    this.totalPendientes.set(this.listaTareas.length - this.totalCompletadas());
  }

  agregarTarea(){
    this.crud.create('tareas',{
      id_usuario: this.sesionService.obtenerSesion().id_usuario,
      nombre: this.nuevaTarea.trim(),
      completada: false
    })
    .subscribe((res:any)=>{
      if (res.success) {
        this.listaTareas.push({
          id_tarea: res.data,
          nombre: this.nuevaTarea.trim(),
          completada: false
        })
        this.nuevaTarea = '';
        this.actualizarTotales();
      }
    })
  }
}
