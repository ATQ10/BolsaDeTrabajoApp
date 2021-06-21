import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AspiranteService } from 'src/app/services/aspirante.service';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css']
})
export class AspiranteComponent implements OnInit {
  idAspirante:any;
  aspirante:any;
  permiso:any;
  descripcion:any;
  constructor(
    private aspiranteService:AspiranteService,
    private permisoService: PermisoService,
    private activedRoute: ActivatedRoute) {
      this.idAspirante = this.activedRoute.snapshot.params.idA;
     }


     ngOnInit(): void {
      this.permiso="";
      this.cargar(this.idAspirante);
      this.actualizarPermisos();
      this.descripcion="";
    }
    actualizarPermisos(){
      this.permisoService.get(this.idAspirante)
        .subscribe(
        response => {
          console.log(response);
          this.permiso = response;
          console.log(this.permiso.nombre);
  
        },
        error => {
          console.log(error);
        });
    }

    cargar(id:any):void{
    //Aspirante
    this.aspiranteService.get(this.idAspirante)
        .subscribe(
        response => {
          console.log(response);
          if(response.length!=0){
            this.aspirante=response;
          }else{
            this.aspirante=null;
          }
        },
        error => {
          console.log(error);
        });
    }

    enviar():void{
      if(this.descripcion==""){
        alert("Debe escribir una descripción")
        return;
      }else{
        const data = {
          descripcion: this.descripcion,
          nombre: this.aspirante.nombre,
          email: this.aspirante.email
        };
        this.aspiranteService.enviar(this.idAspirante.id,data)
        .subscribe(
          response => {
            console.log(response);
            alert(response.message);
          },
          error => {
            console.log(error);
          }); 
          this.descripcion="";
      }
    }

}
