import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  //elimina el pipe despues de que deja de existir la aplicación
  UsuarioActivosObs: Observable<any>;

  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.UsuarioActivosObs = this.chatService.getUsuariosActivos();

    //Emitir el obtener usuarios
    this.chatService.emitirUsuariosActivos();
  }

}
