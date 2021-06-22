import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { md5 } from 'src/app/acceso/md5';
import { EmpresaService } from 'src/app/services/empresa.service';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  puesto:string="";
  tipo:string="";
  cantidad:number=0;
  fecha_vigencia:string="";
  pregunta:any;

  vacantes:any;
  vacante:any;
  idEmpresa:any;
  empresa:any;

  constructor(
    private modalService: NgbModal,
    private vacanteService:VacanteService,
    private empresaService:EmpresaService,
    private activedRoute: ActivatedRoute,
    private router: Router) {
      this.idEmpresa = this.activedRoute.snapshot.params.idE;
     }

  ngOnInit(): void {
    this.puesto="";
    this.tipo="";
    this.cantidad=0;
    this.fecha_vigencia="";
    this.pregunta="";
    this.cargar(this.idEmpresa);
  }

  cargar(id:any):void{
    //vacante
    console.log(this.idEmpresa);
    this.vacanteService.get(this.idEmpresa)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.vacantes=response;
        }else{
          this.vacantes=null;
        }
      },
      error => {
        console.log(error);
      });
  //Empresa
  this.empresaService.get(this.idEmpresa)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.empresa=response;
        }else{
          this.empresa=null;
        }
      },
      error => {
        console.log(error);
      });
  }

  abrir(id:any,contenido:any):void{
    var modo=localStorage.getItem('modo');

    if(modo==md5("a")){
      this.actualizarVacante(id);

      this.modalService.open(contenido, { scrollable: true });
    }

  }

  actualizarVacante(id:any):void{
    this.vacanteService.getId(id)
      .subscribe(
      response => {
        console.log(response);
        if(response){
          this.vacante=response[0];
          this.puesto=this.vacante.puesto;
          this.tipo=this.vacante.tipo;
          this.cantidad=this.vacante.cantidad;
          this.fecha_vigencia=this.vacante.fecha_vigencia;

          //this.pregunta=this.vacante.;
        }else{
          this.vacante=null;
        }
      },
      error => {
        console.log(error);
      });
  }

  guardarSolicitud():void{

  }

  limpiarSolicitud():void{
    
  }
}
