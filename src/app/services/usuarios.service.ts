import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRresponse } from '../interfaces/irresponse.interface';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';
import { IError } from '../interfaces/ierror.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // Para que el servicio pueda hacer una petición HTTP, tendrá que inyectar un cliente HTTP:

  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAllObservable() : Observable<IRresponse> {
    // Petición asíncrona por defecto para recuperar el listado de usuarios
    return this.httpClient.get<IRresponse>(this.baseUrl)
  }

  getAllObservableN(numPagina: string) : Observable<IRresponse> {
    // Petición asíncrona para recuperar el listado de usuarios de una determinada página del API
    return this.httpClient.get<IRresponse>(`${this.baseUrl}?page=${numPagina}`)
  }

  getByIdObservable(id : string) : Observable<IUsuario> {
    // Petición asíncrona para recuperar información de un Usuario concreto
    return this.httpClient.get<IUsuario>(`${this.baseUrl}/${id}`)
  }

  delete(id: string) : Promise<IUsuario | IError> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.baseUrl}/${id}`));
  }

  update(usuario: IUsuario): Promise<IUsuario | IError> {
    // Destructuring.
    // En este caso el API puede devolver un objeto de tipo Usuari o de tipo Error
    let { _id, ...usuarioBody } = usuario;
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.baseUrl}/${_id}`, usuarioBody))
  }

  insert(usuario: IUsuario): Promise<IUsuario> {
    let { _id, ...usuarioBody } = usuario;
    return lastValueFrom(this.httpClient.post<IUsuario>(this.baseUrl, usuarioBody))
  }

}
