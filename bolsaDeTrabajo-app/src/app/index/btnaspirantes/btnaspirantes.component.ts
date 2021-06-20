import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { md5 } from 'src/app/acceso/md5';
import { AspiranteService } from 'src/app/services/aspirante.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-btnaspirantes',
  templateUrl: './btnaspirantes.component.html',
  styleUrls: ['./btnaspirantes.component.css']
})

export class BtnaspirantesComponent implements OnInit {
  data:any;

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
  nuevo_CV: string = "";
  closeResult: string = "";
  submitted = false;
  constructor(private modalService: NgbModal,
    private aspiranteService: AspiranteService,
    public login: LoginService) { this.limpiar(); }

  ngOnInit(): void {
    // Obtener el arreglo de localStorage
    this.obtenerData();
  }
  actualizarData(){
    this.aspiranteService.get(this.data.id)
      .subscribe(
      response => {
        console.log(response);
        // Se guarda en localStorage despues de JSON stringificarlo 
        localStorage.setItem('data', JSON.stringify(response));
        localStorage.setItem('modo', md5('a'));
        this.data = localStorage.getItem('data');
        this.data = JSON.parse(this.data);
        this.obtenerData();
      },
      error => {
        console.log(error);
      });
  }

  obtenerData():void{
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    this.nombre=this.data.nombre;
    this.apellido=this.data.apellido;
    this.fecha_nacimiento=this.data.fecha_nacimiento;
    this.sexo=this.data.sexo;
    this.email=this.data.email;
    this.domicilio=this.data.domicilio;
    this.telefono=this.data.telefono;
    this.nacionalidad=this.data.nacionalidad;
    this.residencia=this.data.residencia;
    this.idioma_primario=this.data.idioma_primario;
    this.idioma_secundario=this.data.idioma_secundario;
    this.disp_horario=this.data.disp_horario;
    this.disp_viajar=this.data.disp_viajar;
    this.areas=this.data.areas;
    this.extras=this.data.extras;
    this.url_logo=this.data.url_logo;
    this.url_CV=this.data.url_CV;
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
      }
  }
  saveAspirante(): void{
    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      sexo: this.sexo,
      fecha_nacimiento: this.fecha_nacimiento,
      email: this.email,
      password: md5(this.password),
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
      activo: true
    };
    this.aspiranteService.update(this.data.id,data)
    .subscribe(
      response => {
        console.log(response);
        alert(response.message);
        this.actualizarData();
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

  eliminarCuenta(): void{
    this.aspiranteService.delete(this.data.id)
      .subscribe(
        response => {
          console.log(response);
          if(response.respuesta==1){
            alert(response.message);
            this.login.logout();
            this.modalService.dismissAll();
          }else{
            alert("Intente mas tarde");
            console.log(response);
          }
        },
        error => {
          console.log(error);
    });
  }

  guardarCV(): void{
    if(this.nuevo_CV==""){
      alert("Complete el campo");
    }else{
      const data = {
        id: this.data.id,
        url_CV: this.nuevo_CV
      };
      this.aspiranteService.cv(this.data.id,data)
      .subscribe(
        response => {
          console.log(response);
          alert(response.message);
          this.actualizarData();
          this.modalService.dismissAll();
        },
        error => {
          console.log(error);
        });
    }
    
  }
}