import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-btnaspirantesder',
  templateUrl: './btnaspirantesder.component.html',
  styleUrls: ['./btnaspirantesder.component.css']
})
export class BtnaspirantesderComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }
}
