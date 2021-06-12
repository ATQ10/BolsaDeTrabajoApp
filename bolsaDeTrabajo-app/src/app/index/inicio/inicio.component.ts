import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  //Tipo de acceso
  tipo:string='';
  //Banners general
  bgeneral:string='https://www.defontana.com/cl/wp-content/uploads/2017/08/capital-de-trabajo.png';
  //Banners Empresa
  bempresa:string='https://i.pinimg.com/564x/e2/c5/5d/e2c55d668dad677984331af5a8567b20.jpg'
  //Banners Aspirante
  baspirante:string='https://cdn.bizneo.com/blog/wp-content/uploads/2020/01/roles-de-un-equipo-de-trabajo-810x455.jpg'
  urlBanner:string='';

  //Secciones
  seccionDer:string='';
  seccionIzq:string='';
  constructor() {
   }

  ngOnInit(): void {
    this.tipo='e';

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
