import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';

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
   submitted = false;

  constructor(
    private modalService: NgbModal,
    private empresaService: EmpresaService
    ) {
      this.limpiar();
     }

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
        this.saveEmpresa();
        this.limpiar();
        alert("Verifique su cuenta en su email personal")
      }
  }

  saveEmpresa(): void{
    const data = {
      nombre: this.nombre,
      encargado: this.encargado,
      fecha_fundacion: this.fecha_fundacion,
      email: this.email,
      password: this.password,
      password2: this.password2,
      domicilio: this.domicilio,
      telefono: this.telefono,
      sede: this.sede,
      horario_atencion: this.horario_atencion,
      areas: this.areas,
      extras: this.extras,
      url_logo: this.url_logo,
      activo: false
    };
    this.empresaService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  limpiar(): void {
    this.nombre = "";
    this.encargado = "";
    this.fecha_fundacion = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.domicilio = "";
    this.telefono = "";
    this.sede = "";
    this.horario_atencion = "";
    this.areas = "";
    this.extras = "";
    this.url_logo = "";
  }
}