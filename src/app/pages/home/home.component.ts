import { Component } from '@angular/core';
import { ListadoUsuariosComponent } from '../listado-usuarios/listado-usuarios.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListadoUsuariosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
