import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AspiranteService } from 'src/app/services/aspirante.service';
import {md5} from '../md5'; 
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any;

  email: String="";
  password: String="";
  modo: String="aspirantes";

  constructor(private router: Router,
    private empresaService: EmpresaService,
    private aspiranteService: AspiranteService,
    public login: LoginService
    ) {
    
  }

  ngOnInit(): void {
    this.data="";
    this.limpiar();
    if(this.login.isActive())
      this.router.navigate(["./"]);
  }

  validarUsuario(): void{
    if(this.email==""||this.password==""){
      alert("Complete los campos");
    }else{
      const data={
        email: this.email,
        password: md5(this.password)
      };
      if(this.modo=="aspirantes"){
        this.aspiranteService.login(data)
        .subscribe(
          response => {
            console.log(response);
            this.data = response;
            if(response.length!=0){
              if(this.data[0].activo){
                if(this.data[0].password==data.password){
                  // Se guarda en localStorage despues de JSON stringificarlo 
                  localStorage.setItem('data', JSON.stringify(this.data[0]));
                  localStorage.setItem('modo', md5('a'));
                  this.router.navigate(["./"]);                 
                  alert("Bienvenid@");
                }else{
                  alert("Contraseña incorrecta");
                }
              }else{
                alert("Cuenta no verificada");
              }
            }else{
              alert("Email no registrado");
            }
          },
          error => {
            console.log(error);
          });
      }else if(this.modo=="empresas"){
        this.empresaService.login(data)
        .subscribe(
          response => {
            console.log(response);
            this.data = response;
            if(response.length!=0){
              if(this.data[0].activo){
                if(this.data[0].password==data.password){
                  // Se guarda en localStorage despues de JSON stringificarlo 
                  localStorage.setItem('data', JSON.stringify(this.data[0]));
                  localStorage.setItem('modo', md5('e'));
                  this.router.navigate(["./"]);                 
                  alert("Bienvenid@");
                }else{
                  alert("Contraseña incorrecta");
                }
              }else{
                alert("Cuenta no verificada");
              }
            }else{
              alert("Email no registrado");
            }
          },
          error => {
            console.log(error);
          });
      }
    }
  }

  limpiar(): void{
    this.email = "";
    this.password = "";
    this.modo = "aspirantes";
  }

}
