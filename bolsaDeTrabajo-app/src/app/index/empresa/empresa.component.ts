import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { VacanteService } from 'src/app/services/vacante.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  vacantes:any;
  idEmpresa:any;
  empresa:any;
  constructor(
    private vacanteService:VacanteService,
    private empresaService:EmpresaService,
    private activedRoute: ActivatedRoute) {
      this.idEmpresa = this.activedRoute.snapshot.params.idE;
     }

  ngOnInit(): void {
    this.cargar(this.idEmpresa);
  }

  cargar(id:any):void{
    //vacante
    console.log(this.idEmpresa);
    this.vacanteService.get(this.idEmpresa)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.vacantes=response;
        }else{
          this.vacantes=null;
        }
      },
      error => {
        console.log(error);
      });
  //Empresa
  this.empresaService.get(this.idEmpresa)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.empresa=response;
        }else{
          this.empresa=null;
        }
      },
      error => {
        console.log(error);
      });
  }

}
