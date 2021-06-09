import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
   //Campos de formulario Empresa
   nombre: string = "";
   encargado: string = "";
   fecha_fundacion: string = "";
   email: string = "";
   password: string = "";
   password2: string = "";
   domicilio: string = "";
   telefono: string = "";
   sede: string = "";
   horario_atencion: string = "";
   areas: string = "";
   extras: string = "";
   url_logo: string = "";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }

  registrar(): void {
    if(this.nombre==""||this.encargado==""||this.fecha_fundacion==""||this.email==""||this.password==""||this.password2==""){
      alert("Complete todos los campos");
    }else if(this.password!=this.password2){
        alert("Las contraseña no coinciden");
        return;
      } else{
        alert(this.nombre);
        alert(this.email);
        alert(this.password);
        alert(this.password2);
      }
  }

  limpiar(): void {
    this.nombre = "";
    this.encargado = "";
    this.fecha_fundacion = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
  }
}
