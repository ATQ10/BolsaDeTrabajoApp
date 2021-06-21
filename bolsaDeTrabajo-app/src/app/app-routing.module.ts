import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './index/inicio/inicio.component';
import { LoginComponent } from './acceso/login/login.component';
import { EmpresasComponent } from './index/empresas/empresas.component';
import { AspirantesComponent } from './index/aspirantes/aspirantes.component';
import { GesaspiranteComponent } from './index/gesaspirante/gesaspirante.component';
import { GessolicitudesComponent } from './index/gessolicitudes/gessolicitudes.component';
import { AspiranteComponent } from './index/aspirante/aspirante.component';
import { EmpresaComponent } from './index/empresa/empresa.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'empresas', component: EmpresasComponent},
  { path: 'aspirantes', component: AspirantesComponent},
  { path: 'gesaspirante', component: GesaspiranteComponent},
  { path: 'solicitud/:id', component: GessolicitudesComponent},
  { path: ':idA/aspirante', component: AspiranteComponent},
  { path: ':idE/empresa', component: EmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
