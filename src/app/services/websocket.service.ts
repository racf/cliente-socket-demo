import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
public sokectStatus = false;
  constructor( private socket: Socket ) {
      this.checkStatus();
    }

    checkStatus() {
      this.socket.on('connect', () => {
        console.log('Conectado al servidor...!');
        this.sokectStatus = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor...!');
        this.sokectStatus = false;
      });
    }
    //evento, el evento que se quiere emitir
    //payload, la información que se desea enviar
    //callback, función que se desea ejecutar despues de realizar la tarea
    emit( evento: string, payload?: any, callback?: Function) {
      this.socket.emit( evento, payload, callback );
    }

    //función que escucha cualquier evento que emita el servidor
    //Regresa un observable, en este caso todabia no esta escuchando "suscribe"
    listen( evento: string ) {
      return this.socket.fromEvent( evento );
    }
}
