import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vista-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent {
  @Input() idUsuario: string = ""

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

  usuariosService = inject(UsuariosService)

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

  deleteUser(id: string) {
    alert(`Vas a borrar al usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name}`)
  }
}
