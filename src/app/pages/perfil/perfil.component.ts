import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CurrentUserService } from '../../utils/current-user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService
  ) { }

  ngOnInit(): void {
  }

  atualizar(): void {
    console.log('Atualizando usuário...');
  }

  deletar(): void {
    console.log('Deletando usuário...')
  }

}
