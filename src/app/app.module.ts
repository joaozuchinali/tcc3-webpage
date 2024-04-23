import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ItemMenuComponent } from './components/item-menu/item-menu.component';
import { FormsModule } from '@angular/forms';
import { EquipesComponent } from './equipes/equipes.component';
import { ProjetoComponent } from './projetos/projeto/projeto.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CreateAreaComponent } from './components/create-area/create-area.component';
import { ItemEquipeComponent } from './components/item-equipe/item-equipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFoundComponent,
    ProjetosComponent,
    PerfilComponent,
    ItemMenuComponent,
    EquipesComponent,
    ProjetoComponent,
    CreateAreaComponent,
    ItemEquipeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
