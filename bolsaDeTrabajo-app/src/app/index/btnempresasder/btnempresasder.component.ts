import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { md5 } from 'src/app/acceso/md5';
import { AspiranteService } from 'src/app/services/aspirante.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-btnempresasder',
  templateUrl: './btnempresasder.component.html',
  styleUrls: ['./btnempresasder.component.css']
})
export class BtnempresasderComponent implements OnInit {
  solicitudes:any;
  data:any;
  aspirantes:any;
  codigos:any;

  constructor(
    private modalService: NgbModal,
    private aspiranteService:AspiranteService,
    public login: LoginService,
    private empresaService: EmpresaService,
    private router: Router,
    private solicitudService: SolicitudService
    ) {
     }

     

  ngOnInit(): void {
    this.codigos=['','','','','','','',''];
    this.solicitudes="";
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    this.actualizarSolicitudes();
    this.busqueda();
  }

  busqueda(): void{
    this.aspiranteService.getAll('')
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.aspirantes=response;
          for (let index = 0; index < this.aspirantes.length; index++) {
            this.codigos[index]=md5(this.aspirantes[index].id.toString());
          }
        }else{
          this.aspirantes=null;
        }
      },
      error => {
        console.log(error);
      });
  }
  
  actualizarSolicitudes():void{
    this.solicitudService.getEmpresa(this.data.id)
      .subscribe(
      response => {
        console.log(response);
        this.solicitudes=response;
      },
      error => {
        console.log(error);
      });
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }
  
  irAspirante():void{
    this.router.navigate(["./aspirantes"]);
  }
  
  verSolicitud(id:any):void{
    this.router.navigate([id,"revisar"]);
    this.modalService.dismissAll();
  }
  codigo(url:any):void{
    url = md5(url.toString());
    console.log(url);
    alert("Sala: "+ url);
    window.location.href="http://127.0.0.1:3001/"+url;

  }
}