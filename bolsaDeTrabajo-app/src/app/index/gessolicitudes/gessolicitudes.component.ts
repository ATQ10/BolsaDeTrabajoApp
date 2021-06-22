import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VacanteService } from 'src/app/services/vacante.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoginService } from 'src/app/services/login.service';
import { md5 } from 'src/app/acceso/md5';

@Component({
  selector: 'app-gessolicitudes',
  templateUrl: './gessolicitudes.component.html',
  styleUrls: ['./gessolicitudes.component.css']
})
export class GessolicitudesComponent implements OnInit {
  empresa:any;
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
    private empresaService:EmpresaService,
    private loginService:LoginService,
    private router:Router
  ) { 
    this.id = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.solicitud="";
    this.vacantes="";
    this.empresa="";
    this.preguntas=['','','','',''];
    this.actualizarSolicitud();
    var modo=localStorage.getItem('modo');

    if(modo==md5("a")){
      return;
    }else if(modo==md5("e")){
      this.router.navigate(["./"]);
    }
  }

  actualizarEmpresa():void{
    //Empresa
    this.empresaService.get(this.solicitud.idEmpresa)
    .subscribe(
    response => {
      console.log(response);
      if(response){
        this.empresa=response;
      }else{
        this.empresa=null;
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
        this.actualizarVacantes();
        this.actualizarEmpresa();
        this.data = localStorage.getItem('data');
        this.data = JSON.parse(this.data);
        if(!this.data){
          this.router.navigate(["./"]);
        }
        if(!(this.solicitud.idAspirante==this.data.id && this.loginService.isActive())){ 
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
    video   = url;
 
    return this._sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8080/"+video+".webm");   
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
}