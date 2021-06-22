import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private modalService: NgbModal,
    public login: LoginService,
    private empresaService: EmpresaService,
    private router: Router,
    private solicitudService: SolicitudService
    ) {
     }


  ngOnInit(): void {
    this.solicitudes="";
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    this.actualizarSolicitudes();
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
}