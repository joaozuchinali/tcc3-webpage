import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-equipe',
  templateUrl: './item-equipe.component.html',
  styleUrl: './item-equipe.component.scss'
})
export class ItemEquipeComponent {
  @Input('nome') nome: string = '';
  editEquipe: boolean = false;
  focus: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  edit() {
    this.editEquipe = !this.editEquipe;
  }

  changeFocus(val: boolean) {
    this.focus = val
  }

  verProjetos() {
    this.router.navigate([`../projetos`], { relativeTo: this.route});
  }
}
