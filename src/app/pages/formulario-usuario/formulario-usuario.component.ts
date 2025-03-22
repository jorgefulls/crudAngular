import { Component, inject, Input} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent {
  @Input() idUsuario: string = ""
  usuarioForm: FormGroup = new FormGroup({},[])
  usuario: IUsuario = 
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
  title: string = "NUEVO USUARIO"

  ngOnInit() {
    console.log(this.idUsuario)

    // Si recibimos id, tengo que llamar a getById y pintar los datos en el formulario
    if (this.idUsuario) {
      this.title = "ACTUALIZAR USUARIO"
      // LLamamos al servicio y cargamos los datos del usuario
      this.usuariosService.getByIdObservable(this.idUsuario).subscribe({
        // Acierto
        next: (data: IUsuario) => {
          console.log(data)
          this.usuario = data
        },
        // Error
        error: (error) => {
          console.log(error)
          alert('Error en la obtención de los datos del Usuario.')
        }
      })
    }

    this.usuarioForm = new FormGroup({
      _id: new FormControl(this.idUsuario || null, [
        Validators.required,
        Validators.minLength(2)]),
      id: new FormControl(this.usuario?.id || null, [
        Validators.required,
        Validators.minLength(2)]),
      firs_name: new FormControl(this.usuario?.first_name || "", [
        Validators.required,
        Validators.minLength(3)]),
      last_name: new FormControl(this.usuario?.last_name || "", [
        Validators.required,
        Validators.minLength(3)]),
      email: new FormControl(this.usuario?.email || "", [
        Validators.required,
        Validators.email
      ]),
      image: new FormControl(this.usuario?.image || "", [
        Validators.required,
        Validators.pattern('^https?://')
      ]),
      username: new FormControl(this.usuario?.username || "", [
        Validators.required,
        Validators.minLength(3)]),
      password  : new FormControl(this.usuario?.password || "", [
        Validators.required,
        Validators.minLength(8)
      ])
    },[])

    // Si no, recoger los datos y después insertarlos con ayuda del servicio
  }

  getDataForm() {

  }
}
