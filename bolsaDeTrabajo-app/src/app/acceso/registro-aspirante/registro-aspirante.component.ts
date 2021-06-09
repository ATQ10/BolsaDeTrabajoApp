import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-aspirante',
  templateUrl: './registro-aspirante.component.html',
  styleUrls: ['./registro-aspirante.component.css']
})

export class RegistroAspiranteComponent implements OnInit {
  //Campos de formulario Aspirante
  nombre: string = "";
  apellido: string = "";
  fecha_nacimiento: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";
  domicilio: string = "";
  telefono: string = "";
  nacionalidad: string = "";
  residencia: string = "";
  idioma_primario: string = "";
  idioma_secundario: string = "";
  disp_horario: string = "";
  disp_viajar: string = "";
  areas: string = "";
  extras: string = "";
  url_logo: string = "";
  url_CV: string = "";
  closeResult: string = "";

  constructor(private modalService: NgbModal) { 
      this.limpiar();
    }

  ngOnInit(): void {
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }

  registrar(): void {
    if(this.nombre==""||this.apellido==""||this.fecha_nacimiento==""||this.email==""||this.password==""||this.password2==""){
      alert("Complete todos los campos");
    }else if(this.password!=this.password2){
        alert("Las contraseña no coinciden");
        return;
      } else{
        alert(this.nombre);
        alert(this.apellido);
        alert(this.fecha_nacimiento);
        alert(this.email);
        alert(this.password);
        alert(this.password2);
      }
  }

  limpiar(): void {
    this.nombre = "";
    this.apellido = "";
    this.fecha_nacimiento = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
  }

  
}
