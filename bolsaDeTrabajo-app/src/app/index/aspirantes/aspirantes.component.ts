import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AspiranteService } from 'src/app/services/aspirante.service';

@Component({
  selector: 'app-aspirantes',
  templateUrl: './aspirantes.component.html',
  styleUrls: ['./aspirantes.component.css']
})
export class AspirantesComponent implements OnInit {
  aspirantes:any;
  buscar:string="";
  constructor(
    private aspiranteService:AspiranteService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.buscar="";
    this.busqueda();
  }

  busqueda(): void{
    this.aspiranteService.getAll(this.buscar)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.aspirantes=response;
        }else{
          this.aspirantes=null;
        }
      },
      error => {
        console.log(error);
      });
  }

  consultarAspirante(id:any):void{
    this.router.navigate([id,"aspirante"]);
  }

}
