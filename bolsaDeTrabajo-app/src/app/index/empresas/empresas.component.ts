import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  empresas:any;
  buscar:string="";
  constructor(
    private empresaService:EmpresaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.buscar="";
    this.busqueda();
  }

  busqueda(): void{
    this.empresaService.getAll(this.buscar)
      .subscribe(
      response => {
        console.log(response);
        if(response.length!=0){
          this.empresas=response;
        }else{
          this.empresas=null;
        }
      },
      error => {
        console.log(error);
      });
  }

  consultarEmpresa(id:any):void{
    this.router.navigate([id,"empresa"]);
  }

}
