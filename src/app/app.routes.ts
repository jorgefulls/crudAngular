import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { VistaUsuarioComponent } from './pages/vista-usuario/vista-usuario.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component: HomeComponent },
    {path: "listado_usuarios", component: ListadoUsuariosComponent },
    {path: "user/:id", component: VistaUsuarioComponent },
    {path: "newuser", component: FormularioUsuarioComponent },
    {path: "updateuser/:id", component: FormularioUsuarioComponent },
    {path: "**", redirectTo: 'home' },
];
