import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink, Router } from '@angular/router';

import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-vista-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent {
  @Input() idUsuario: string = ""
  router = inject(Router)
  usuariosService = inject(UsuariosService)

  elUsuario : IUsuario | any =
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

  ngOnInit() {
    // Llamar al Servicio para traernos los datos de este Usuario
    this.usuariosService.getByIdObservable(this.idUsuario).subscribe({
      // Acierto
      next: (data: IUsuario) => {
        this.elUsuario = data
      },
      // Error
      error: (error) => {
        console.log(error)
        alert('Error en la obtención de los datos del Usuario.')
      }
    })
  }

  updateUser(idUsuario: string) {
    this.router.navigate(['/updateuser/', idUsuario])
  }

  deleteUser(id: string) {
    toast(`Vas a borrar al usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name}`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          // Borrado del usuario llamando al servicio
          await this.usuariosService.delete(id)
          // Como el API devuelve una respuesta ficticia y no provoca un borrado realmente, simplemente recargamos la HOME.
          toast(`Usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name} BORRADO!!`)
          this.router.navigate(['/home'])
        }
      }
    });
  }
}
