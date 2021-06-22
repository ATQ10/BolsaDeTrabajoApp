import { Component, OnInit, EventEmitter  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { md5 } from 'src/app/acceso/md5';
import { EmpresaService } from 'src/app/services/empresa.service';
import { VacanteService } from 'src/app/services/vacante.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  //---------
  formData: any;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: any;
  //-----------
  urlSafe:any;
  data:any;
  puesto:string="";
  tipo:string="";
  cantidad:number=0;
  fecha_vigencia:string="";
  pregunta:Array<string>=['','','','',''];
  respuesta:string="";
  vacantes:any;
  vacante:any;
  idEmpresa:any;
  empresa:any;
  this: any;

  constructor(public sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private vacanteService:VacanteService,
    private empresaService:EmpresaService,
    private solicitudService:SolicitudService,
    private activedRoute: ActivatedRoute,
    private router: Router) {

      this.files = [];
      this.uploadInput = new EventEmitter<UploadInput>();
      this.humanizeBytes = humanizeBytes;

      this.idEmpresa = this.activedRoute.snapshot.params.idE;
    }

  ngOnInit(): void {
    this.puesto="";
    this.tipo="";
    this.cantidad=0;
    this.fecha_vigencia="";
    this.respuesta="";
    this.pregunta=['','','','',''];
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);

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
          console.log(this.vacante);
          this.puesto=this.vacante.puesto;
          this.tipo=this.vacante.tipo;
          this.cantidad=this.vacante.cantidad;
          this.fecha_vigencia=this.vacante.fecha_vigencia;
          this.pregunta[0]=this.vacante.p1;
          this.pregunta[1]=this.vacante.p2;
          this.pregunta[2]=this.vacante.p3;
          this.pregunta[3]=this.vacante.p4;
          this.pregunta[4]=this.vacante.p5;
          if(this.tipo=='video'){
            //this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8080");
          }
        }else{
          this.vacante=null;
        }
      },
      error => {
        console.log(error);
      });
  }

  guardarSolicitud():void{
    this.respuesta=(document.getElementById("respuesta") as HTMLInputElement).value;
    if(this.respuesta==""){
      alert("Complete su respuesta");
    }else{
      const data2 = {
        idAspirante: this.data.id,
        idEmpresa: this.vacante.idEmpresa,
        idVacante: this.vacante.id,
        nombreAspirante: this.data.nombre,
        apellidoAspirante: this.data.apellido,
        nombreEmpresa: this.empresa.nombre,
        puesto: this.vacante.puesto,
        fecha_vigencia: this.vacante.fecha_vigencia,
        tipo: this.vacante.tipo,
        respuesta: this.respuesta,
        estado: ''
      };
      
      console.log(data2);
      this.solicitudService.create(data2)
      .subscribe(
        response => {
          console.log(response);
          alert("Solicitud Enviada");
          this.limpiarSolicitud();
          this.modalService.dismissAll();
        },
        error => {
          console.log(error);
        });
        //--------
        //--------
    }
  }

  

  limpiarSolicitud():void{
    this.respuesta="";
  }


  //-----------------------------

  startUpload(): void {
    const event: UploadInput = {
    type: 'uploadAll',
    url: './',
    method: 'POST',
    data: { foo: 'bar' },
    };
    this.files = [];
    this.uploadInput.emit(event);
}

}