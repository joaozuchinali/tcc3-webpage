import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjetosComponent } from './pages/projeto-wrapper/projetos/projetos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ItemMenuComponent } from './components/item-menu/item-menu.component';
import { FormsModule } from '@angular/forms';
import { EquipesComponent } from './pages/equipes/equipes.component';
import { ProjetoComponent } from './pages/projeto-wrapper/projeto/projeto.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CreateAreaComponent } from './components/create-area/create-area.component';
import { ItemEquipeComponent } from './components/item-equipe/item-equipe.component';
import { ProjetoWrapperComponent } from './pages/projeto-wrapper/projeto-wrapper.component';
import { ItemProjetoComponent } from './components/item-projeto/item-projeto.component';
import { DialogcompComponent } from './components/dialogcomp/dialogcomp.component';
import { BlockedComponent } from './pages/blocked/blocked.component';
import { DominiosProjetoComponent } from './components/project/dominios-projeto/dominios-projeto.component';
import { TempoProjetoComponent } from './components/project/tempo-projeto/tempo-projeto.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule } from '@angular/common/http';
import { LoadingcompComponent } from './components/loadingcomp/loadingcomp.component';

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
    ItemEquipeComponent,
    ProjetoWrapperComponent,
    ItemProjetoComponent,
    DialogcompComponent,
    BlockedComponent,
    DominiosProjetoComponent,
    TempoProjetoComponent,
    LoadingcompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    DigitOnlyModule,
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
