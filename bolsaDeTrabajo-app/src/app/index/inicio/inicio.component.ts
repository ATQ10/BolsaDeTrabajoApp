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
  bgeneral:string='https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/05/peru-machu-picchu-inca.jpg?w=1000&h=312&crop=1';
  //Banners Empresa
  bempresa:string='https://i.pinimg.com/736x/cc/e7/47/cce747aa55ff17fd592eb8a87183707a.jpg'
  //Banners Aspirante
  baspirante:string='https://auladeestudio.net/wp-content/uploads/2018/03/naturaleza-banner.jpg'
  urlBanner:string='';

  //Secciones
  seccionDer:string='';
  seccionIzq:string='';
  constructor() {
   }

  ngOnInit(): void {
    this.tipo='';

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
