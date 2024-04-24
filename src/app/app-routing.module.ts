import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjetosComponent } from './pages/projeto-wrapper/projetos/projetos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EquipesComponent } from './pages/equipes/equipes.component';
import { ProjetoComponent } from './pages/projeto-wrapper/projeto/projeto.component';
import { ProjetoWrapperComponent } from './pages/projeto-wrapper/projeto-wrapper.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: MainComponent,
    children: [
      { 
        path: 'equipes', component: EquipesComponent
      },
      { 
        path: 'projetos', component: ProjetoWrapperComponent,
        children: [
          { path: '', component: ProjetosComponent},
          { path: ':identificador', component: ProjetoComponent}
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
