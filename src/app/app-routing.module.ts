import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ProjetoComponent } from './projetos/projeto/projeto.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: MainComponent,
    children: [
      { 
        path: 'equipes', component: EquipesComponent, 
        children: [
          { 
            path: 'projetos', component: ProjetosComponent,
            children: [
              { path: ':identificador', component: ProjetoComponent}
            ]
          }
        ]
      },
      { path: 'perfil', component: PerfilComponent },
      { path: '', redirectTo: 'equipes', pathMatch: "full"}
    ] 
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
