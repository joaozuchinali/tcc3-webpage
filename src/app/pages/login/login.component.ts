import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  cardlogin: boolean = true;

  constructor(
    private router: Router
  ) { }

  login() {
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
