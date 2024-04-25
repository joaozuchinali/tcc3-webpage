import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../../interfaces/equipe';
import { CurrentEquipeService } from '../../utils/current-equipe.service';
import { User } from '../../interfaces/user';
import { DialogCentralService } from '../../utils/dialog-central.service';

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

  users: User[] = [];

  dialogKey = 'di-equipes';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentEquipe: CurrentEquipeService,
    private dialogService: DialogCentralService
  ) {

  }

  ngOnInit(): void {
  }
  
  // Retorna os usuários da equipe
  getUsers() {
    // http get...
    this.users = [
      {email: 'a', idstatus: 1, idusuario: 1, nome: 'aa', senha: '1'},
      {email: 'b', idstatus: 1, idusuario: 2, nome: 'bb', senha: '2'},
      {email: 'c', idstatus: 1, idusuario: 3, nome: 'cc', senha: '3'},
    ];

    if(this.users.length == 0) {
      this.fallbacktext = 'Nenhum usuário encontrado';
    }
  }

  // Remove um usuário da equipe
  removeuserconfirm(user: User) {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja atualizar a nova equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.removeUser(user);});
  }
  removeUser(user: User) {
    // http delete...
    this.getUsers();
  }

  // visibilidade da edição
  edit() {
    if(this.editEquipe == false) {
      console.log('testes');
      this.getUsers();
    }

    this.editEquipe = !this.editEquipe;
  }

  // estilo focado/desfocado
  changeFocus(val: boolean) {
    this.focus = val
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
      text: 'Deseja deletar a equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.deleteEquipe()});
  }
  deleteEquipe() {
    // http post...
  }

  adicionarpartconfirm() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja adicionar o participante a equipe?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => {this.adicionarParticipante()});
  }
  adicionarParticipante() {
    // http post verifica participante
    // http post adicionar participante

    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Participante não encontrado', 
      title: 'Erro',
      type: 'message'
    });
  }
}
