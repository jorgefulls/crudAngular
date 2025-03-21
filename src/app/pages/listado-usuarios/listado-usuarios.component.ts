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
  paginasAPI = 0
  arrayPaginas = new Array()


  ngOnInit() {
    // Consumición del método Observable getAllObservable() definido en el Servicio
    this.usuariosService.getAllObservable().subscribe({
      // Acierto
      next: (data: IRresponse) => {
        this.arrUsuariosObservable = data.results
        this.paginasAPI = data.total_pages

        // Construyo un array con números secuenciales de las páginas disponibles en el API
        this.arrayPaginas = Array(this.paginasAPI).fill(1).map((x, i) => i + 1)
      },
      // Error
      error: (error) => {
        console.log(error)
        alert('Error en la obtención de los datos del origen.')
      }
    })
  }

  gotoPage(numPagina: string) {
    // Consumición del método Observable getAllObservableN() definido en el Servicio
    this.usuariosService.getAllObservableN(numPagina).subscribe({
      // Acierto
      next: (data: IRresponse) => {
        this.arrUsuariosObservable = data.results
      },
      // Error
      error: (error) => {
        console.log(error)
        alert('Error en la obtención de los datos del origen.')
      }
    })
  }
}
