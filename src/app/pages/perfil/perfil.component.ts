import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';
import { DialogCentralService } from '../../utils/dialog-central.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  
  nome: string = '';
  senha: string = '';
  email: string = '';

  private dialogKey = 'di-perfil';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService,
    private dialogService: DialogCentralService
  ) { }

  ngOnInit(): void {
    this.fillCampos();

    
  }

  // Preenche os campos com os dados atuais do usuário
  fillCampos(): void {
    const user = this.currentUser.getUser();
    this.nome  = user.nome;
    this.senha = user.senha;
    this.email = user.email;
  }

  // Atualiza o registro do usuário
  atualizar(): void {
    if(this.senha.trim() == '')
      return;
  
    if(this.nome.trim() == '')
      return;

    if(this.email.trim() == '')
      return;

    this.updateUser();
  }

  updateUser() {
    const user = this.currentUser.getUser();
    user.email = this.email;
    user.senha = this.senha;
    user.nome  = this.nome;

    // html post
    console.log(user);
  }

  // deleta o registro do usuário
  deletar(): void {
    console.log('Deletando usuário...')
  }

  confirmUpdate() {
    this.dialogService.config({key: this.dialogKey, text: 'Deseja atualizar esse perfil?', title: 'Confirmar'}, this.atualizar, () => {});
  }

  confirmDelete() {
    this.dialogService.config({key: this.dialogKey, text: 'Deseja deletar esse perfil?', title: 'Confirmar'}, this.deletar, () => {});
  }
}