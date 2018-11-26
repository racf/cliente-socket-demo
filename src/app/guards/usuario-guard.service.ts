 import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
//CanActivate, es la condición que debe cumplir una ruta, para dejarlo pasar.
export class UsuarioGuardService implements CanActivate {

  constructor( public wsService: WebsocketService, private router: Router ) { }

  canActivate() {
    console.log( this.wsService.getUsuario() );
      if ( this.wsService.getUsuario() ) {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
  }
}
