import { Component, inject, Input} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';


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
  usuario!: IUsuario
  usuariosService = inject(UsuariosService)
  title: string = "NUEVO USUARIO"
  router = inject(Router);

  ngOnInit() {
    // Si recibimos id, tengo que llamar a getById y pintar los datos en el formulario
    if (this.idUsuario) {
      this.title = "ACTUALIZAR USUARIO"
      // LLamamos al servicio y cargamos los datos del usuario
       let response = this.usuariosService.getByIdObservable(this.idUsuario).subscribe({
        // Acierto
        next: (data: IUsuario) => {
          this.usuario = data
          console.log(this.usuario)
          this.sincronizarFormulario()
        },
        // Error
        error: (error) => {
          console.log(error)
          alert('Error en la obtención de los datos del Usuario.')
        }
      })
      this.sincronizarFormulario()
    } else {
      this.sincronizarFormulario()
    }
  }

  sincronizarFormulario() {
    this.usuarioForm = new FormGroup({
      _id: new FormControl(this.idUsuario || null, []),
      id: new FormControl(this.usuario?.id || 0, []),
      first_name: new FormControl(this.usuario?.first_name || "", [Validators.required]),
      last_name: new FormControl(this.usuario?.last_name || "", [Validators.required]),
      email: new FormControl(this.usuario?.email || "", [Validators.required, Validators.email]),
      image: new FormControl(this.usuario?.image || "", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      username: new FormControl(this.usuario?.username || "", [Validators.required]),
      password  : new FormControl(this.usuario?.password || "", [Validators.required])
    },[])
  }

  async getDataForm() {
    console.log('Procesando el formulario...')
    let response: IUsuario | any
    try {
      if (this.usuarioForm.value._id) {
        // Actualizando...
        console.log('Actualizando...')
        response = await this.usuariosService.update(this.usuarioForm.value);
      } else {
        // Insertando...
        console.log('Insertando...')
        response = await this.usuariosService.insert(this.usuarioForm.value)
        this.router.navigate(['/home'])
      }

      if (response._id) {
        toast('Actualización realizada correctamente!')
      }

    } catch (msg: any) {
      console.log('Se produce error')
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message))
      }
    }
  }
}
