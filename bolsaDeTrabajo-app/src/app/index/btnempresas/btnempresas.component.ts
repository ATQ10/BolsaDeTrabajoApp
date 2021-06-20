import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';
import { VacanteService } from 'src/app/services/vacante.service';
import { md5 } from 'src/app/acceso/md5';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-btnempresas',
  templateUrl: './btnempresas.component.html',
  styleUrls: ['./btnempresas.component.css']
})
export class BtnempresasComponent implements OnInit {
  data:any;
  vacante:any;
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

  puesto: string = "";
  tipo: string = "";
  cantidad: number = 0;
  pregunta: Array<string> = ["","","","",""];
  fecha_vigencia: string = "";

  constructor(
    private modalService: NgbModal,
    private empresaService: EmpresaService,
    private vacanteService: VacanteService,
    public login: LoginService
    ) {
      this.limpiar();
     }

  ngOnInit(): void {
    // Obtener el arreglo de localStorage
    this.obtenerData();
  }

  actualizarData(){
    this.empresaService.get(this.data.id)
      .subscribe(
      response => {
        console.log(response);
        // Se guarda en localStorage despues de JSON stringificarlo 
        localStorage.setItem('data', JSON.stringify(response));
        localStorage.setItem('modo', md5('e'));
        this.data = localStorage.getItem('data');
        this.data = JSON.parse(this.data);
      },
      error => {
        console.log(error);
      });
  }

  obtenerData():void{
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    this.nombre = this.data.nombre;
    this.encargado = this.data.encargado;
    this.fecha_fundacion = this.data.fecha_fundacion;
    this.email = this.data.email;
    this.domicilio = this.data.domicilio;
    this.telefono = this.data.telefono;
    this.sede = this.data.sede;
    this.horario_atencion = this.data.horario_atencion;
    this.areas = this.data.areas;
    this.extras = this.data.extras;
    this.url_logo = this.data.url_logo;
  }

  openScrollableContent(contenido: any) {
    this.modalService.open(contenido, { scrollable: true });
  }

  openScrollablegestion(contenido:any){
    this.actualizarVacantes();
    this.modalService.open(contenido, { scrollable: true });
  }

  actualizarVacantes():void{
    this.vacanteService.get(this.data.id)
      .subscribe(
      response => {
        console.log(response);
        this.vacante=response;
      },
      error => {
        console.log(error);
      });
  }

  registrar(): void {
    if(this.nombre==""||this.encargado==""||this.fecha_fundacion==""||this.email==""||this.password==""||this.password2==""){
      alert("Complete todos los campos");
    }else if(this.password!=this.password2){
        alert("Las contraseña no coinciden");
        return;
      } else{
        this.saveEmpresa();
      }
  }

  saveEmpresa(): void{
    const data = {
      nombre: this.nombre,
      encargado: this.encargado,
      fecha_fundacion: this.fecha_fundacion,
      email: this.email,
      password: md5(this.password),
      domicilio: this.domicilio,
      telefono: this.telefono,
      sede: this.sede,
      horario_atencion: this.horario_atencion,
      areas: this.areas,
      extras: this.extras,
      url_logo: this.url_logo,
      activo: true
    };
    this.empresaService.update(this.data.id,data)
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

  saveVacante(): void{
    const data = {
      idEmpresa: this.data.id,
      puesto: this.puesto,
      tipo: this.tipo,
      cantidad: this.cantidad,
      fecha_vigencia: this.fecha_vigencia,
      p1: this.pregunta[0],
      p2: this.pregunta[1],
      p3: this.pregunta[2],
      p4: this.pregunta[3],
      p5: this.pregunta[4]
    };
    console.log(data);
    this.vacanteService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        alert("Vacante publicada");
        this.limpiarVacante();
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

  eliminarVacante(id:any): void{
    //Proceso para eliminar vacante de la BDD
    this.vacanteService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          if(response.respuesta==1){
            alert(response.message);
            this.actualizarVacantes();
          }else{
            alert("Intente mas tarde");
            console.log(response);
          }
        },
        error => {
          console.log(error);
    });
  }

  eliminarCuenta(): void{
    this.empresaService.delete(this.data.id)
      .subscribe(
        response => {
          console.log(response);
          if(response.respuesta==1){
            alert(response.message);
            this.login.logout();
            
          }else{
            alert("Intente mas tarde");
            console.log(response);
          }
        },
        error => {
          console.log(error);
    });
  }

  guardarVacante():void{
    var vacio=false;
    if(this.puesto==""||this.tipo==""||this.fecha_vigencia==""){
      alert("Complete los campos");
      return;
    }
    if(this.cantidad>0){
      for (let index = 0; index < this.cantidad; index++) {
        this.pregunta[index]=(<HTMLInputElement>document.getElementById(''+index)).value
        if(this.pregunta[index]==""){
          vacio=true;
        }
      }
      if(vacio){
        alert("Algunas preguntas se encuentran vacias");
      }else{
        //Insertar datos a bd
        this.saveVacante();
      }
    }else{
      alert("Seleccione una cantidad de preguntas");
    }
  }

  limpiarVacante():void{
    this.puesto="";
    this.tipo="";
    this.cantidad=0;
    this.fecha_vigencia="";
    if(this.cantidad>0){
      for (let index = 0; index < this.cantidad; index++) {
        this.pregunta[index]="";
      }
    }
  }
}