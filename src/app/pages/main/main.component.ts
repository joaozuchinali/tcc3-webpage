import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItens } from '../../interfaces/menu-itens';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  menuitens: MenuItens[] = [
    { nome: 'Equipes', page: 'equipes', isfocus: false},
    { nome: 'Projetos', page: 'projetos', isfocus: false},
    { nome: 'Perfil', page: 'perfil', isfocus: false},
    { nome: 'Sair', page: 'exit', isfocus: false}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
}
