import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink, Router } from '@angular/router';
import { IError } from '../../interfaces/ierror.interface';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2'


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
        toast('Error en la obtención de los datos del Usuario.')
      }
    })
  }

  updateUser(idUsuario: string) {
    this.router.navigate(['/updateuser/', idUsuario])
  }

  deleteUser(id: string) {
    Swal.fire(
    {
      title: '¡Atención!',
      text: `¿Deseas borrar al usuario  ${this.elUsuario.first_name} ${this.elUsuario.last_name}?`,
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
              toast(`Usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name} BORRADO!!`)
              this.router.navigate(['/home'])
            }

        } else if (result.isDismissed) { // Se pulsa Cancelar
          Swal.close
        }
      })
  }
}
