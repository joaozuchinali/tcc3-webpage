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
import { ClearEquipeService } from './utils/clear-equipe.service';
import { BlockedComponent } from './pages/blocked/blocked.component';
import { ClearProjetoService } from './utils/clear-projeto.service';
import { VisaoProjetoComponent } from './components/project/visao-projeto/visao-projeto.component';
import { UsuariosProjetoComponent } from './components/project/usuarios-projeto/usuarios-projeto.component';
import { DominiosProjetoComponent } from './components/project/dominios-projeto/dominios-projeto.component';
import { TempoProjetoComponent } from './components/project/tempo-projeto/tempo-projeto.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'login', component: LoginComponent,
    resolve: {
      clearedEquipe: ClearEquipeService,
      clearedProjeto: ClearProjetoService
    }
  },
  { 
    path: 'main', 
    component: MainComponent,
    children: [
      { 
        path: 'equipes', component: EquipesComponent,
        resolve: {
          clearedEquipe: ClearEquipeService,
          clearedProjeto: ClearProjetoService
        }
      },
      { 
        path: 'projetos', component: ProjetoWrapperComponent,
        children: [
          { path: '', component: ProjetosComponent},
          { 
            path: ':identificador', 
            component: ProjetoComponent,
            children: [
              { path: 'visao-geral', component: VisaoProjetoComponent },
              { path: 'usuarios-pesquisados', component: UsuariosProjetoComponent },
              { path: 'dominios', component: DominiosProjetoComponent },
              { path: 'tempo', component: TempoProjetoComponent }
            ]
          }
        ],
        resolve: {
          clearedProjeto: ClearProjetoService
        }
      },
      { 
        path: 'perfil', 
        component: PerfilComponent,
        resolve: {
          clearedEquipe: ClearEquipeService,
          clearedProjeto: ClearProjetoService
        }
      },
      { path: '', redirectTo: 'equipes', pathMatch: "full"}
    ] 
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'blocked', component: BlockedComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
