import { Component, OnInit } from '@angular/core';
import { md5 } from 'src/app/acceso/md5';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  data:any;

  //Tipo de acceso
  tipo:string='';
  //Banners general
  bgeneral:string='https://www.defontana.com/cl/wp-content/uploads/2017/08/capital-de-trabajo.png';
  //Banners Empresa
  bempresa:string='https://ellevo.com/es/wp-content/uploads/sites/3/2018/09/06-csc-em-grandes-empresas.jpg'
  //Banners Aspirante
  baspirante:string='https://cdn.bizneo.com/blog/wp-content/uploads/2020/01/roles-de-un-equipo-de-trabajo-810x455.jpg'
  urlBanner:string='';

  //Secciones
  seccionDer:string='';
  seccionIzq:string='';
  constructor() {
   }

  ngOnInit(): void {
    // Obtener el arreglo de localStorage
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);
    var modo=localStorage.getItem('modo');

    if(modo==md5("a")){
      this.tipo='a';
    }else if(modo==md5("e")){
      this.tipo='e';
    }else{
      this.tipo='';
    }
    switch (this.tipo) {
      case 'e':
        this.urlBanner = this.bempresa;
        this.seccionIzq = 'Administra tu empresa';
        this.seccionDer = ' Contacto con aspirantes';
        break;
      case 'a':
        this.urlBanner = this.baspirante;
        this.seccionIzq = 'Administra tu perfil';
        this.seccionDer = 'Contacto con Empresas';
        break;
      default:
        this.urlBanner = this.bgeneral;
        this.seccionIzq = 'Publica tu empresa';
        this.seccionDer = 'Publica tu perfil';
        break;
    }
  }
}