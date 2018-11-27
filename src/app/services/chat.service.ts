import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketService ) { }

  //funcion para enviar mensajes
  sendMessage( mensaje: string ) {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  //funcion para escuchar mensajes nuevos 
  //un observable escucha hasta que se realiza el suscribe, se suscribe donde se utiliza en este caso en chat.component.ts
  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  //función para escuchar mensajes privados
  //un observable escucha hasta que se realiza el suscribe, se suscribe donde se utiliza en este caso en app.component.ts
  getMessagesPrivate() {
    return this.wsService.listen( 'mensaje-privado' );
  }

  //función para obtener a los usuarios activos
  getUsuariosActivos() {
    return this.wsService.listen( 'usuarios-activos' );
  }
  //para obtener los usaurios para un cliente determinado
  emitirUsuariosActivos() {
    return this.wsService.emit( 'obtener-usuarios' );
  }
}
