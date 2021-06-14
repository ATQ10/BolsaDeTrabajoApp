import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';
import { md5 } from 'src/app/acceso/md5';

@Component({
  selector: 'app-btnempresas',
  templateUrl: './btnempresas.component.html',
  styleUrls: ['./btnempresas.component.css']
})
export class BtnempresasComponent implements OnInit {
  data:any;

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
  fecha_vigencia: string = "";

  constructor(
    private modalService: NgbModal,
    private empresaService: EmpresaService
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

  eliminarVacante(): void{
    //Proceso para eliminar vacante de la BDD
    alert("Se eliminó vacante exitosamente");
  }

  eliminarCuenta(): void{
    alert('Se eliminó cuenta exitosamente')
  }
}