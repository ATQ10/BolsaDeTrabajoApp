import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-btnempresasder',
  templateUrl: './btnempresasder.component.html',
  styleUrls: ['./btnempresasder.component.css']
})
export class BtnempresasderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private empresaService: EmpresaService
    ) {
      //this.limpiar();
     }


  ngOnInit(): void {
    //this.obtenerData();
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }
}
