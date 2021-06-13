import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { md5 } from '../acceso/md5';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data:any;

  constructor(private router: Router) { }
  
  isActive():boolean{
    var activo = false;
    this.data = localStorage.getItem('data');
    var modo = localStorage.getItem('modo');
    this.data = JSON.parse(this.data);
    if(modo==md5("a")){
      activo = true;
    }else if(modo==md5("e")){
      activo = true;
    }else{
      activo = false;
    }
    return activo;
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(["./login"]);
  }

}