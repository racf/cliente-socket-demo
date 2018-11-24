import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  texto = '';
  //para poder elimiar el chatComponent
  mensajesSubscription: Subscription;
  //objeto para recuperar los mensajes emitidos por el servidor
  mensajes: any[] = [];
  //Generar el scroll automatico hacia abajo 
  elemento: HTMLElement;
  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {
      this.elemento = document.getElementById('chat-mensajes');
      this.mensajes.push( msg );
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      });
    });
  }

  //Destruyendo el objeto cuando se abandona o pasa a otra pagina
  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {
    if ( this.texto.trim().length === 0 ) {
      return;
    }
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
