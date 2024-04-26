import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';
import { DialogCentralService } from '../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { HttpRetorno } from '../../interfaces/api/http-retorno';
import { ApiUrlsService } from '../../utils/api-urls.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  
  nome: string = '';
  senha: string = '';
  email: string = '';

  dialogKey = 'di-perfil';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService
  ) { }

  ngOnInit(): void {
    this.fillCampos();
  }

  // Preenche os campos com os dados atuais do usuário
  fillCampos(): void {
    const user = this.currentUser.get();
    this.nome  = user.nome;
    this.senha = user.senha;
    this.email = user.email;
  }

  // Atualiza o registro do usuário
  confirmUpdate() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja atualizar seu perfil?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.atualizar() });
  }

  atualizar(): void {
    if(this.senha.trim() == '' && this.nome.trim() == '' && this.email.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Preencha todos os campos!', 
        title: 'Campos vazios', 
        type: 'message'
      });
      return;
    }

    this.updateUser();
  }

  updateUser() {
    const user = this.currentUser.get();
    user.senha = this.senha;
    user.nome  = this.nome;

    // html post
    // console.log(user);

    this.http.put<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.updateUsuario, user)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Object && value.data.idstatus == 1) {
          this.currentUser.set(<User>value.data);

          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Usuário atualizado com sucesso', 
            title: 'Sucesso',
            type: 'message'
          });
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível deletar o registro do usuário', 
            title: 'Falha ao deletar',
            type: 'message'
          });
        }
      }
    });
  }


  // deleta o registro do usuário
  confirmDelete() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja deletar esse perfil?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.deletar() });
  }
  
  deletar(): void {
    console.log('Deletando usuário...');
    const user = this.currentUser.get();

    console.log(user);
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.deleteUsuario, user)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Object && value.data.idstatus == 2) {
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível deletar o registro do usuário', 
            title: 'Falha ao deletar',
            type: 'message'
          });
        }
      }
    });
  }
}