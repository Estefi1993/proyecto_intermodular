import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { AddEditUsuariosComponent } from './components/add-edit-usuarios/add-edit-usuarios.component';
import { NgModule } from '@angular/core';
import { UsuarioService } from './services/usuarios.service';

export const routes: Routes = [
    {path: '', component: AddEditUsuariosComponent },
    {path: 'list', component: ListUsuariosComponent },
    {path: 'add', component:AddEditUsuariosComponent  },
    {path: 'edit/:id', component: AddEditUsuariosComponent },
    {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers: [UsuarioService],

})

export class AppRoutes {}
