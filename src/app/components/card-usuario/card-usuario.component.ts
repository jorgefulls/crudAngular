import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-usuario.component.html',
  styleUrl: './card-usuario.component.css'
})

export class CardUsuarioComponent {
  @Input() miUsuario: IUsuario | any =
  {
    _id : '',
    id : 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: ''
  }
   //| any  // Se pone any también para gestionar el undefined de cuando se pulsa en borrar un usuario

  deleteUser(id: string) {
    alert(`Vas a borrar al usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name}`)
  }
}
