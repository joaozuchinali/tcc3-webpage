import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../../interfaces/equipe';
import { CurrentEquipeService } from '../../utils/current-equipe.service';
import { User } from '../../interfaces/user';
import { DialogCentralService } from '../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../utils/api-urls.service';
import { HttpRetorno } from '../../interfaces/api/http-retorno';
import { UserGetmail } from '../../interfaces/api/user-getmail';
import { Equipeuso } from '../../interfaces/equipeuso';
import { UsoEquipesGet } from '../../interfaces/api/uso-equipes-get';
import { CurrentUserService } from '../../utils/current-user.service';
import { UsoEquipesDelete } from '../../interfaces/api/uso-equipes-delete';
import { EquipeDelete } from '../../interfaces/api/equipe-delete';
import { ListEquipesService } from '../../utils/list-equipes.service';

@Component({
  selector: 'app-item-equipe',
  templateUrl: './item-equipe.component.html',
  styleUrl: './item-equipe.component.scss'
})
export class ItemEquipeComponent implements OnInit{
  @Input('equipe') equipe: Equipe = {idequipe: -1, idstatus: -1, nome: ''};

  editEquipe: boolean = false;
  focus: boolean = false;
  fallbacktext: string = 'Buscando usuários';
  public emailAddPart: string = '';

  users: User[] = [];

  dialogKey = 'di-equipes';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentEquipe: CurrentEquipeService,
    private currentUser: CurrentUserService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService,
    private listEquipes: ListEquipesService
  ) {

  }

  ngOnInit(): void {
  }

  // estilo focado/desfocado
  changeFocus(val: boolean) {
    this.focus = val
  }

  // visibilidade da edição
  editShow() {
    if(this.editEquipe == false) {
      this.getUsers();
    }

    this.editEquipe = !this.editEquipe;
  }

  // Retorna os usuários da equipe
  getUsers() {
    // http get...
    const params: UsoEquipesGet = {
      idequipe: this.equipe.idequipe,
      idstatus: 1
    }
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getUsuariosEquipe, params)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Array && value.data.length) {
          this.setUsers(<User[]>value.data);
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Erro ao tentar adicionar usuário para equipe.', 
            title: 'Usuários não encontrados',
            type: 'message'
          });
        }
      }
    });
  }
  private setUsers(users: User[]): void {
    const user = this.currentUser.get();

    this.users = users.filter(e => e.idusuario != user.idusuario);
    if(this.users.length == 0) {
      this.fallbacktext = 'Nenhum usuário encontrado';
    }
  }
  
  // Remove um usuário da equipe
  removeuserconfirm(user: User) {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja remover o usuário ' + user.email + ' da equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.removeUser(user);});
  }
  removeUser(user: User) {
    const del: UsoEquipesDelete = {
      idequipe: this.equipe.idequipe,
      idusuario: user.idusuario
    };

    this.http.put<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.deleteEquipeUso, del)
    .subscribe({
      next: (value) => {
        console.log(value);
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível remover o usuário' + user.email + ' da equipe!', 
            title: 'Erro ao remover usuário',
            type: 'message'
          });
        }
      }
    });
  }
    


  // redireciona para visualizar os projetos da equipe
  verProjetos() {
    this.currentEquipe.set(this.equipe);
    
    this.router.navigate(
      [`../projetos`], 
      { 
        relativeTo: this.route
      }
    );
  }

  // Atualiza a equipe
  updateequipeconfirm() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja atualizar a equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.updateEquipe()});
  }
  updateEquipe() {
    // http post...
  }

  // Deleta a equipe
  deleteequipeconfirm() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja desabilitar a equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.deleteEquipe()});
  }
  deleteEquipe() {
    const equipeDelete: EquipeDelete = {
      idequipe: this.equipe.idequipe
    };
    this.http.put<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.deleteEquipe, equipeDelete)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Object) {
          this.listEquipes.list.next(true);
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Falha ao inativar equipe!', 
            title: 'Erro',
            type: 'message'
          });
        }
      }
    });
  }

  // Validações e confirmações dos usuários da equipe
  adicionarpartconfirm() {
    // Verifica os campos
    if(this.emailAddPart.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Preencha o campo de e-mail para adicionar um usuário!', 
        title: 'Campo vazio',
        type: 'message'
      });
      return;
    }

    // Verifica se o usuário existe
    const userGetMail: UserGetmail = {
      email: this.emailAddPart,
      idstatus: 1
    };
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getUsuarioMail, userGetMail)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Array && value.data.length) {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Deseja adicionar o participante' + this.emailAddPart + ' a equipe?', 
            title: 'Confirmar',
            type: 'crud'
          }, () => {this.adicionarParticipante(value.data[0].idusuario)});
        } else {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'O usuário selecionado não foi encontrado ou se encontra desativado.', 
            title: 'Usuário não adicionado',
            type: 'message'
          });
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'O usuário selecionado não foi encontrado ou se encontra desativado.', 
            title: 'Usuário não adicionado',
            type: 'message'
          });
        }
      }
    });
  }

  adicionarParticipante(idusuario: number) {
    const newEquipeUso: Equipeuso = {
      idcredencial: 1,
      idequipe: this.equipe.idequipe,
      idusuario: idusuario
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.createEquipeUso, newEquipeUso)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Object) {
          this.getUsers();
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: (err.error.data && err.error.data.code == 2) ? err.error.msg : 'Erro ao tentar adicionar usuário para equipe.', 
            title: 'Falha ao adicionar',
            type: 'message'
          });
        }
      }
    });
  }
}
