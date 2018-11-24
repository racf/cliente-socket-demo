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
      de: 'Fernando',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  //funcion para escuchar mensajes nuevos 
  //un observable escucha hasta que se realiza el suscribe, se suscribe donde se utiliza en este caso en chat.component.ts
  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
