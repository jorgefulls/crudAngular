import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UsuariosService } from '../../services/usuarios.service';

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

  usuariosService = inject(UsuariosService)
  router = inject(Router);


  deleteUser(id: string) {
    toast(`Vas a borrar al usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name}`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          // Borrado del usuario llamando al servicio
          await this.usuariosService.delete(id)
          // Como el API devuelve una respuesta ficticia y no provoca un borrado realmente, simplemente recargamos la HOME.
          toast(`Usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name} BORRADO!!`)
          this.router.navigate(['/home'])
        }
      }
    });
  }

}
