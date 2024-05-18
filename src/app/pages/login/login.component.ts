import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';
import { User } from '../../interfaces/user';
import { Datalogin } from '../../interfaces/datalogin';
import { Datacreateuser } from '../../interfaces/datacreateuser';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../utils/api-urls.service';
import { DialogCentralService } from '../../utils/dialog-central.service';
import { HttpRetorno } from '../../interfaces/api/http-retorno';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  emailLogin: string = '';
  senhaLogin: string = '';

  nomeCreate: string  = '';
  emailCreate: string = '';
  senhaCreate: string = '';

  cardlogin: boolean = true;
  dialogKey: string = 'di-login';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService,
    private dialogService: DialogCentralService
  ) { }

  ngOnInit(): void {
    
   
  }
  // Evento de login registrado
  login(): void {

    if(this.emailLogin.trim() == '' || this.senhaLogin.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Preencha ambos os campos para realizar o login.', 
        title: 'Campos vazios',
        type: 'message'
      });
      return;
    }

    this.getUser({
      email: this.emailLogin,
      senha: this.senhaLogin,
      idstatus: 1
    });
  }
  // Busca as informações do usuário
  getUser(infos: Datalogin): void {
    // console.log(infos);
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getUsuario, infos)
    .subscribe({
      next: (value) => {
        console.log(value);

        if(value.data && value.data instanceof Object) {
          this.configUser(<User>value.data);
        } else {
          this.dialogService.config({
            key: this.dialogKey, 
            title: 'Usuário não encontrado',
            text: 'Verifique se as credências foram corretamente inseridas.', 
            type: 'message'
          });
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar o usuário, verifique se as credênciais de acesso foram devidamente preenchidas.', 
            title: 'Usuário não encontrado',
            type: 'message'
          });
        }
      }
    });
  }
  // Seta os valores do usuário
  configUser(infos: User): void {
    this.currentUser.set(infos);
    this.router.navigate(
      ['/main'], { }
    );
  }

  // Alterna a visibilidade de cards
  changeCard(): void {
    if(this.cardlogin == false) {
      this.clearFieldsCreate();
    } else {
      this.clearFieldsLogin();
    }

    this.cardlogin = !this.cardlogin;
  }

  // Evento de cadastro registrado
  cadastrar(): void {
    if(this.emailCreate.trim() == '' || this.senhaCreate.trim() == '' || this.nomeCreate.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Preencha os campos de email, senha e nome para realizar o cadastro.', 
        title: 'Campos vazios',
        type: 'message'
      });
      return;
    }

    const newUser: Datacreateuser = {
      nome: this.nomeCreate,
      senha: this.senhaCreate,
      email: this.emailCreate
    }

    this.postUser(newUser);
  }

  // Envia os dados do usuário para a criação
  postUser(infos: Datacreateuser): void {
    // console.log(infos);
    this.http.post(this.apiUrls.apiUrl + this.apiUrls.createUser, infos)
    .subscribe({
      next: (value) => {
        this.changeCard();
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: err.error.msg ? err.error.msg :
                  'Não foi possível cadastrar o usuário tente novamente', 
            title: 'Problemas no cadastro',
            type: 'message'
          });
        }
      }
    });
  }

  // Limpa os campos de criação
  clearFieldsCreate(): void {
    this.senhaCreate = '';
    this.nomeCreate = '';
    this.emailCreate = '';
  }

  clearFieldsLogin(): void {
    this.emailLogin = '';
    this.senhaLogin = '';
  }
}