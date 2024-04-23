import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-equipe',
  templateUrl: './item-equipe.component.html',
  styleUrl: './item-equipe.component.scss'
})
export class ItemEquipeComponent {
  @Input('nome') nome: string = '';
  editEquipe: boolean = false;
  focus: boolean = false;

  constructor() {

  }

  edit() {
    this.editEquipe = !this.editEquipe;
  }

  changeFocus(val: boolean) {
    this.focus = val
  }
}
