import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AspiranteService } from 'src/app/services/aspirante.service';

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
  sexo: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";
  domicilio: string = "";
  telefono: string = "";
  nacionalidad: string = "";
  residencia: string = "";
  idioma_primario: string = "";
  idioma_secundario: string = "";
  disp_horario: string = "Si";
  disp_viajar: string = "Si";
  areas: string = "";
  extras: string = "";
  url_logo: string = "";
  url_CV: string = "";
  closeResult: string = "";
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private aspiranteService: AspiranteService
    ) { 
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
        this.saveAspirante();
        this.limpiar();
        alert("Verifique su cuenta en su email personal");
      }
  }

  saveAspirante(): void{
    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      sexo: this.sexo,
      fecha_nacimiento: this.fecha_nacimiento,
      email: this.email,
      password: this.password,
      domicilio: this.domicilio,
      telefono: this.telefono,
      nacionalidad: this.nacionalidad,
      residencia: this.residencia,
      idioma_primario: this.idioma_primario,
      idioma_secundario: this.idioma_secundario,
      disp_horario: this.disp_horario,
      disp_viajar: this.disp_viajar,
      areas: this.areas,
      extras: this.extras,
      url_logo: this.url_logo,
      url_CV: this.url_CV,
      activo: false
    };
    this.aspiranteService.create(data)
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
    this.apellido = "";
    this.fecha_nacimiento = "";
    this.sexo = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.domicilio = "";
    this.telefono = "";
    this.nacionalidad = "";
    this.residencia = "";
    this.idioma_primario = "";
    this.idioma_secundario = "";
    this.disp_horario = "Si";
    this.disp_viajar = "Si";
    this.areas = "";
    this.extras = "";
    this.url_logo = "";
    this.url_CV = "";
  }
  
}
