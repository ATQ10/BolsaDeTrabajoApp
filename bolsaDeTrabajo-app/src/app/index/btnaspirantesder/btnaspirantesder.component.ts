import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-btnaspirantesder',
  templateUrl: './btnaspirantesder.component.html',
  styleUrls: ['./btnaspirantesder.component.css']
})
export class BtnaspirantesderComponent implements OnInit {

  constructor(private modalService: NgbModal,
    public login: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }
  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }
  irEmpresa():void{
    this.router.navigate(["./empresas"]);
  }
}
