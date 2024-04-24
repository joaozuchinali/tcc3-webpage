import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';
import { User } from '../../interfaces/user';
import { Datalogin } from '../../interfaces/datalogin';
import { Datacreateuser } from '../../interfaces/datacreateuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  emailLogin: string = '';
  senhaLogin: string = '';

  nomeCreate: string  = '';
  emailCreate: string = '';
  senhaCreate: string = '';

  cardlogin: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService
  ) { }

  // Evento de login registrado
  login(): void {

    if(this.emailLogin.trim() == '')
      return;

    if(this.senhaLogin.trim() == '')
      return;

    this.getUser({
      email: this.emailLogin,
      senha: this.senhaLogin
    });
  }
  // Busca as informações do usuário
  getUser(infos: Datalogin): void {
    console.log(infos)
    // http post ...
    const userinfo: User = { 
      email: 'teste@teste.mail', 
      nome: 'Teste', 
      idstatus: 1, 
      senha: '123456', 
      idusuario: -1
    }
    this.configUser(userinfo);
  }
  // Seta os valores do usuário
  configUser(infos: User): void {
    this.currentUser.setUser(infos);
    this.router.navigate(
      ['/main'], { }
    );
  }

  // Alterna a visibilidade de cards
  changeCard(): void {
    if(this.cardlogin == false) {
      this.clearFieldsCreate();
    }

    this.cardlogin = !this.cardlogin;
  }

  // Evento de cadastro registrado
  cadastrar(): void {
    if(this.emailCreate.trim() == '')
      return;

    if(this.senhaCreate.trim() == '')
      return;

    if(this.nomeCreate.trim() == '')
      return;

    const newUser: Datacreateuser = {
      nome: this.nomeCreate,
      senha: this.senhaCreate,
      email: this.emailCreate
    }

    this.postUser(newUser);
  }

  // Envia os dados do usuário para a criação
  postUser(infos: Datacreateuser): void {
    // http request
    console.log(infos);
    this.changeCard();
  }

  // Limpa os campos de criação
  clearFieldsCreate(): void {
    this.senhaCreate = '';
    this.nomeCreate = '';
    this.emailCreate = '';
  }
}