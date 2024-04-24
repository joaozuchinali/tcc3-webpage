import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-projeto',
  templateUrl: './item-projeto.component.html',
  styleUrl: './item-projeto.component.scss'
})
export class ItemProjetoComponent {
  @Input('nome') nome: string = '';
  editProjeto: boolean = false;
  focus: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  edit() {
    this.editProjeto = !this.editProjeto;
  }

  changeFocus(val: boolean) {
    this.focus = val
  }

  verProjeto() {
    this.router.navigate([`../projeto`], { relativeTo: this.route});
  }
}
