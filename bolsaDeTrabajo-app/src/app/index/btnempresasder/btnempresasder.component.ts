import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-btnempresasder',
  templateUrl: './btnempresasder.component.html',
  styleUrls: ['./btnempresasder.component.css']
})
export class BtnempresasderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public login: LoginService,
    private empresaService: EmpresaService,
    private router: Router
    ) {
     }


  ngOnInit(): void {
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }
  
  irAspirante():void{
    this.router.navigate(["./aspirantes"]);
  }
}
