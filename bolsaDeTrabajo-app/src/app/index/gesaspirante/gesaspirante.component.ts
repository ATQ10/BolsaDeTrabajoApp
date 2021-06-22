import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { md5 } from 'src/app/acceso/md5';
import { AspiranteService } from 'src/app/services/aspirante.service';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-gesaspirante',
  templateUrl: './gesaspirante.component.html',
  styleUrls: ['./gesaspirante.component.css']
})
export class GesaspiranteComponent implements OnInit {
  aspirante:any;
  solicitud:any;
  vacantes:any;
  respuestas:any;
  preguntas:Array<string>=['','','','',''];
  id:any;
  data:any;
  constructor(    
    private solicitudService: SolicitudService,
    private _sanitizer: DomSanitizer,
    private activedRoute: ActivatedRoute,
    private vacanteService: VacanteService,
    private aspiranteService: AspiranteService,
    private loginService:LoginService,
    private router:Router
  ) { 
    this.id = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.solicitud="";
    this.vacantes="";
    this.aspirante="";
    this.preguntas=['','','','',''];
    this.actualizarSolicitud();
    var modo=localStorage.getItem('modo');

    if(modo==md5("a")){
      this.router.navigate(["./"]);
      return;
    }else if(modo==md5("e")){
      
    }
  }

  actualizarAspirante():void{
    //Aspirante
    this.aspiranteService.get(this.solicitud.idAspirante)
    .subscribe(
    response => {
      console.log(response);
      if(response){
        this.aspirante=response;
      }else{
        this.aspirante=null;
      }
    },
    error => {
      console.log(error);
    });
  }
  
  actualizarSolicitud():void{
    this.solicitudService.getId(this.id)
      .subscribe(
      response => {
        console.log(response[0]);
        this.solicitud=response[0];
        if(!this.solicitud){
          this.router.navigate(["./"]);
          return;
        }
        this.actualizarVacantes();
        this.actualizarAspirante();
        this.data = localStorage.getItem('data');
        this.data = JSON.parse(this.data);
        if(!this.data){
          this.router.navigate(["./"]);
        }
        if(!(this.solicitud.idEmpresa==this.data.id && this.loginService.isActive())){ 
          alert("Acceso denegado");
          this.router.navigate(["./"]);
          console.log(this.data.id + " "+this.solicitud.idAspirante);
        }

      },
      error => {
        console.log(error);
      });
  }

  actualizarVacantes():void{
    this.vacanteService.getId(this.solicitud.idVacante)
      .subscribe(
      response => {
        console.log(response[0]);
        this.vacantes=response[0];
        this.preguntas[0] = this.vacantes.p1;
        this.preguntas[1] = this.vacantes.p2;
        this.preguntas[2] = this.vacantes.p3;
        this.preguntas[3] = this.vacantes.p4;
        this.preguntas[4] = this.vacantes.p5;
      },
      error => {
        console.log(error);
      });
  }

  getVideoIframe(url:any) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }

  eliminarSolicitud(id:any){
    //Proceso para eliminar vacante de la BDD
    this.solicitudService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          if(response.respuesta==1){
            alert(response.message);
            this.router.navigate(["./"]);
          }else{
            alert("Intente mas tarde");
            console.log(response);
          }
        },
        error => {
          console.log(error);
    });
  }

  cambiarEstado(estado:any):void{
    const data = {
      idAspirante: this.solicitud.idAspirante,
      idEmpresa: this.solicitud.idEmpresa,
      idVacante: this.solicitud.idVacante,
      nombreAspirante: this.solicitud.nombreAspirante,
      apellidoAspirante: this.solicitud.apellidoAspirante,
      nombreEmpresa: this.solicitud.nombreEmpresa,
      puesto: this.solicitud.puesto,
      fecha_vigencia: this.solicitud.fecha_vigencia,
      tipo: this.solicitud.tipo,
      respuesta: this.solicitud.respuesta,
      estado: estado
    };
    this.solicitud.estado = estado;
    this.solicitudService.update(this.solicitud.id,data)
    .subscribe(
      response => {
        console.log(response);
        alert(response.message);
        
        this.router.navigate([this.solicitud.id,"revisar"]);
      },
      error => {
        console.log(error);
      });
  }
}
