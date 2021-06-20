import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './acceso/login/login.component';
import { RegistroEmpresaComponent } from './acceso/registro-empresa/registro-empresa.component';
import { RegistroAspiranteComponent } from './acceso/registro-aspirante/registro-aspirante.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './index/inicio/inicio.component';
import { CarouselComponent } from './index/carousel/carousel.component';
import { EmpresasComponent } from './index/empresas/empresas.component';
import { AspirantesComponent } from './index/aspirantes/aspirantes.component';
import { HttpClientModule } from '@angular/common/http';
import { BtnempresasComponent } from './index/btnempresas/btnempresas.component';
import { BtnaspirantesComponent } from './index/btnaspirantes/btnaspirantes.component';
import { BtnempresasderComponent } from './index/btnempresasder/btnempresasder.component';
import { GesaspiranteComponent } from './index/gesaspirante/gesaspirante.component';
import { BtnaspirantesderComponent } from './index/btnaspirantesder/btnaspirantesder.component';
import { GessolicitudesComponent } from './index/gessolicitudes/gessolicitudes.component';
import { AspiranteComponent } from './index/aspirante/aspirante.component';
import { EmpresaComponent } from './index/empresa/empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroEmpresaComponent,
    RegistroAspiranteComponent,
    NavbarComponent,
    InicioComponent,
    CarouselComponent,
    EmpresasComponent,
    AspirantesComponent,
    BtnempresasComponent,
    BtnaspirantesComponent,
    BtnempresasderComponent,
    GesaspiranteComponent,
    BtnaspirantesderComponent,
    GessolicitudesComponent,
    AspiranteComponent,
    EmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
