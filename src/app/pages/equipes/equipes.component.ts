import { Component, OnInit } from '@angular/core';
import { AddEquipeService } from '../../utils/add-equipe.service';
import { CurrentUserService } from '../../utils/current-user.service';
import { Equipe } from '../../interfaces/equipe';
import { Equipeuso } from '../../interfaces/equipeuso';
import { Equipesget } from '../../interfaces/api/equipes-get';
import { DialogCentralService } from '../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../utils/api-urls.service';
import { HttpRetorno } from '../../interfaces/api/http-retorno';
import { ListEquipesService } from '../../utils/list-equipes.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.scss'
})
export class EquipesComponent implements OnInit{
  adicionandoEquipe: boolean = false;
  nomeEquipe: string = '';

  equipes: Equipe[] = []
  
  dialogKey = 'di-equipes';

  constructor(
    private addequipe: AddEquipeService,
    private currentUser: CurrentUserService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService,
    private listEquipe: ListEquipesService
  ) {

  }

  ngOnInit(): void {
    this.addEquipesEventWatcher();
    this.getEquipes();
    
    this.listEquipe.list.subscribe((val) => {
      this.getEquipes()
    });
  }

  addEquipesEventWatcher() {
    this.addequipe.addEquipe.subscribe((value) => {
      this.adicionandoEquipe = true;
    });
  }

  adicionarequipeconfirm() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja adicionar uma nova equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.adicionarEquipe() });
  }
  adicionarEquipe() {
    if(this.nomeEquipe.trim() != '') {
      const newEquipe: Equipe = {nome: this.nomeEquipe, idstatus: -1, idequipe: -1}
      this.postEquipe(newEquipe);
    } else {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Preencha todos os campos!', 
        title: 'Erro ao cadastrar', 
        type: 'message'
      });
    }
  }
  // Cria uma nova equipe
  postEquipe(infos: Equipe) {
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.createEquipe, infos)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Object) {
          const usuario = this.currentUser.get();
          const equipeUso: Equipeuso = { 
            idcredencial: 2, 
            idequipe: value.data.idequipe, 
            idusuario: usuario.idusuario
          };

          this.postEquipeUso(equipeUso)
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar as suas equipes.', 
            title: 'Erro no cadastro',
            type: 'message'
          });
        }
      }
    });
  }
  // Cria uma relação entre a equipe e o usuário
  postEquipeUso(infos: Equipeuso) {
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.createEquipeUso, infos)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Object) {
          this.clearFields();
          this.getEquipes();
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível cadastrar a relação entre usuário e equipe.', 
            title: 'Erro no cadastro',
            type: 'message'
          });
        }
      }
    });
  }

  // Limpar os campos após a criação
  clearFields(): void {
    this.nomeEquipe = '';
    this.adicionandoEquipe = false;
  }

  // Cancelar a criação do novo registro
  cancelarAdd() {
    this.nomeEquipe = '';
    this.adicionandoEquipe = false;
  }

  // Retorna as equipes do ERP
  getEquipes(): void {
    const user = this.currentUser.get();
    const queryinfo: Equipesget = {
      idstatus: 1,
      idusuario: user.idusuario
    };

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getEquipes, queryinfo)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Array) {
          this.equipes = <Equipe[]>value.data;
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar as suas equipes.', 
            title: 'Equipes cadastradas',
            type: 'message'
          });
        }
      }
    });
  }
}
