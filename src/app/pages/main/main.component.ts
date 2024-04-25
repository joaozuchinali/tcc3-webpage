import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItens } from '../../interfaces/menu-itens';
import { CurrentUserService } from '../../utils/current-user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  email: string = '';

  menuitens: MenuItens[] = [
    { nome: 'Equipes', page: 'equipes', isfocus: false, icon: ['fas', 'user-group']},
    { nome: 'Projetos', page: 'projetos', isfocus: false, icon: ['fas', 'diagram-project']},
    { nome: 'Perfil', page: 'perfil', isfocus: false, icon: ['fas', 'id-badge']},
    { nome: 'Sair', page: 'exit', isfocus: false, icon: ['fas', 'right-from-bracket']}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUser: CurrentUserService
  ) {

  }

  ngOnInit(): void {
    this.getUser();    
  }

  getUser(): void {
    const val = this.currentUser.get();
    this.email = val.email;
  }
}
