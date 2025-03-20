import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';

@Component({
  selector: 'app-card-usuario',
  standalone: true,
  imports: [],
  templateUrl: './card-usuario.component.html',
  styleUrl: './card-usuario.component.css'
})
export class CardUsuarioComponent {
  @Input() miUsuario!:IUsuario
}
