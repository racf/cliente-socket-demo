import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuardService } from './guards/usuario-guard.service';

//Este modulo se tiene que importar en el archivo app.module.ts para que pueda ser utilizado
//Se genero un modulo para la gestion de rutas
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'mensajes', component: MensajesComponent, canActivate: [ UsuarioGuardService ] },
  { path: '**', component: LoginComponent }
];
@NgModule({
  imports: [
    //Importando nuestro modulo de rutas
    RouterModule.forRoot( appRoutes )
  ],
  //Exportamos para que lo utilice la aplicación en general
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
