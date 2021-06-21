import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-btnaspirantesder',
  templateUrl: './btnaspirantesder.component.html',
  styleUrls: ['./btnaspirantesder.component.css']
})
export class BtnaspirantesderComponent implements OnInit {
  solicitudes:any;
  data:any;

  constructor(private modalService: NgbModal,
    public login: LoginService,
    private solicitudService: SolicitudService,
    private router: Router) { }

  ngOnInit(): void {
    this.solicitudes="";
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    this.actualizarSolicitudes();
  }
  actualizarSolicitudes():void{
    this.solicitudService.get(this.data.id)
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
  irEmpresa():void{
    this.router.navigate(["./empresas"]);
  }

  verSolicitud(id:any):void{
    this.router.navigate([id,"solicitud"]);
    this.modalService.dismissAll();
  }
}
