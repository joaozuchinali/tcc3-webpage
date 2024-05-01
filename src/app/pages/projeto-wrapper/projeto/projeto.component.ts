import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { NavbarItemProjeto } from '../../../interfaces/navbar-item-projeto';
import { Projeto } from '../../../interfaces/projeto';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {
  identificador: string = '';
  dialogKey: string = 'di-projeto-atual';
  projetoAtual: Projeto | null = null;
  focusleave: boolean = false;
  
  itensNavBar: NavbarItemProjeto[] = [
    { text: 'Visão Geral', isclicked: false, path: 'visao-geral' },
    // { text: 'Usuários pesquisados', isclicked: false, path: 'usuarios-pesquisados' },
    { text: 'Domínios', isclicked: false, path: 'dominios' },
    { text: 'Tempo', isclicked: false, path: 'tempo' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentProjeto: CurrentProjetoService
  ) { }

  ngOnInit(): void {
    this.setId();
    this.clickf(this.itensNavBar[0]);
    this.projetoAtual = this.currentProjeto.get();
  }

  // Captura o id
  private setId(): void {
    this.identificador = this.route.snapshot.params['identificador'];  
    this.route.params.subscribe((data) => {
      this.identificador = data['identificador'];
      // console.log(this.identificador);
    });
  }

  clickf(item: NavbarItemProjeto) {
    this.itensNavBar.forEach(e => e.isclicked = false);
    item.isclicked = true;
    this.carregarDados(item);
  }

  carregarDados(item: NavbarItemProjeto) {
    this.router.navigate([item.path], {relativeTo: this.route });
  }

  goback() {
    this.router.navigateByUrl('/main/projetos');
  }

  changeFocus(value: boolean) {
    this.focusleave = value;
  }
}
