import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../domain/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
public sokectStatus = false;
public usuario: Usuario = null;

  constructor( private socket: Socket, private router: Router ) {
    this.cargarStorage();
      this.checkStatus();
    }

    checkStatus() {
      this.socket.on('connect', () => {
        console.log('Conectado al servidor...!');
        this.sokectStatus = true;
        this.cargarStorage();//Verificar, al momento de recargar la pagina se mantenga los datos del usuario
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

    //función para saber que usuario se encuentra conectado
    loginWS( nombre: string ) {
      //console.log('Configurando', nombre);

      // Agregar una promesa ya que esta es una tarea que no es asincrona
      //La promesa para indicar si termino de una menra exitosa 
      return new Promise ( (resolve, reject) => {
        this.emit('configurar-usuario', { nombre }, ( resp ) => {
          //Inicio para recargar usuario y no pierda la sesión
          this.usuario = new Usuario( nombre );
          this.guardarStorage();
          //console.log( resp );
          resolve();
        });
      });
      //En ES6 esto es redundante { nombre: nombre } o { nombre } 
      //el ultimo parametro es el callback de la repuesta se ejecuta despues de ejecutar la acción en el servidor
     /* this.socket.emit( 'configurar-usuario', { nombre: nombre }, ( resp ) => {
        console.log( resp );
      });*/
    }

    logoutWS() {
      this.usuario = null;
      localStorage.removeItem( 'usuario' );

      const payload = {
        nombre: 'sin-nombre'
      };
      //espera un callack
      this.emit( 'configurar-usuario', payload, () => {} );
      this.router.navigateByUrl('');
    }

    //para obtener al usuario
    getUsuario() {
      return this.usuario;
    }
    //Guardar al usuario en el localStorage para en el momento recargar no se pierda la sesión
    guardarStorage() {
      localStorage.setItem( 'usuario', JSON.stringify( this.usuario ));
    }

    //leer desde localStorage
    cargarStorage() {
      if ( localStorage.getItem('usuario') ) {
        this.usuario = JSON.parse( localStorage.getItem('usuario') );
        // console.log('Cargando usuario del localStorage', this.usuario );
        this.loginWS( this.usuario.nombre ); //para que en el servidor se muestre el nombre del usuario al recargar la página.
      }
    }

}
