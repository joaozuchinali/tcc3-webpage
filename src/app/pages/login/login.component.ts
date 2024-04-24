import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  cardlogin: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService
  ) { }

  login() {
    this.currentUser.setUser({ email: 'teste@teste.mail', nome: 'Teste', idstatus: 1, senha: '123456'})
    this.router.navigate(
      ['/main'], { }
    );
  }

  changecard() {
    this.cardlogin = !this.cardlogin;
  }

  cadastrar() {
    
  }
}
