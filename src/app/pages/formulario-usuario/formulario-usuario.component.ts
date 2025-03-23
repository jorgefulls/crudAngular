import { Component, inject, Input} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { IError } from '../../interfaces/ierror.interface';
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
      email: new FormControl(this.usuario?.email || "", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]),
      image: new FormControl(this.usuario?.image || "", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),      
      username: new FormControl(this.usuario?.username || "", [Validators.required]),
      password  : new FormControl(this.usuario?.password || "", [Validators.required])
    },[])
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.usuarioForm.get(controlName)?.hasError(errorName) && this.usuarioForm.get(controlName)?.touched
  }

  async getDataForm() {
    let response: IUsuario | IError | any
    try {
      if (this.usuarioForm.value._id) {

        // Actualizando Usuario...
        
        response = await this.usuariosService.update(this.usuarioForm.value);

        // Procesamos la respuesta asíncrona
        if (response.hasOwnProperty('error')){
          let respuesta = response as IError
          toast(respuesta.error)
        } else {
          // Como el API devuelve una respuesta ficticia y no provoca una actualización realmente, simplemente informamos de que se ha actualizado correcto y recargamos la HOME.
          toast(`Usuario ${this.usuario.first_name} ${this.usuario.last_name} ACTUALIZADO!!`)
          this.router.navigate(['/home'])
        }

      } else {

        // Insertando Nuevo Usuario...

        response = await this.usuariosService.insert(this.usuarioForm.value)

        // Procesamos la respuesta asíncrona
        if (response.hasOwnProperty('id')){
          // Como el API devuelve una respuesta ficticia con un campo id informado y no provoca una inserción realmente, simplemente informamos de que se ha insertado correctamente y recargamos la HOME.
          toast(`Usuario creado con éxito!!`)
          this.router.navigate(['/home'])
        } else {
          toast('Hubo un error durante la creación del usuario')
        }
      }
    } catch (msg: any) {
      console.log('Se produce error')
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message))
      }
    }
  }
}
