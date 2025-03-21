import { Component, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { IRresponse } from '../../interfaces/irresponse.interface';
import { CardUsuarioComponent } from '../../components/card-usuario/card-usuario.component';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CardUsuarioComponent],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent {

  arrUsuariosObservable: IUsuario[] = []
  usuariosService = inject(UsuariosService)

  ngOnInit(){
    // Consumición del método Observable getAll() definido en el Servicio
    this.usuariosService.getAllObservable().subscribe({
      // Acierto
      next: (data: IRresponse) => {
        this.arrUsuariosObservable = data.results
        //console.log("Se han obtenido los usuarios del API!!!!!!")
        //console.log(this.arrUsuariosObservable)
      },
      // Error
      error: (error) => {
        console.log(error)
        alert('Error en la obtención de los datos del origen.')
      }
    })
  }

}
