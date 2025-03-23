import { Component, Input, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UsuariosService } from '../../services/usuarios.service';
import { IError } from '../../interfaces/ierror.interface';
import Swal from 'sweetalert2'

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
    Swal.fire(
    {
      title: '¡Atención!',
      text: `¿Deseas borrar al usuario  ${this.miUsuario.first_name} ${this.miUsuario.last_name}?`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
      .then( async (result) => {
        if (result.isConfirmed) {  // Se pulsa Aceptar

            // Intento de borrado del usuario llamando al servicio
            let response = await this.usuariosService.delete(id)

            // Procesamos la respuesta asíncrona
            if (response.hasOwnProperty('error')){
              let respuesta = response as IError
              toast(respuesta.error)
            } else {
              // Como el API devuelve una respuesta ficticia y no provoca un borrado realmente, simplemente informamos del borrado correcto y recargamos la HOME.
              toast(`Usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name} BORRADO!!`)
              this.router.navigate(['/home'])
            }

        } else if (result.isDismissed) { // Se pulsa Cancelar
          Swal.close
        }
      })
  }

}