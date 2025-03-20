import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient() //Esto es obligatorio para poder hacer peticiones a una API externa desde Angular.
  ]
};
