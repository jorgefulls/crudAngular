import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRresponse } from '../interfaces/irresponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // Para que el servicio pueda hacer una petición HTTP, tendrá que inyectar un cliente HTTP:

  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAllObservable() : Observable<IRresponse> {
    // Petición asíncrona nativa de Angular
    console.log("Obteniendo respuesta del API de usuarios...")
    return this.httpClient.get<IRresponse>(this.baseUrl)
  }
}
