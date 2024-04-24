import { Component, Input } from '@angular/core';
import { AddEquipeService } from '../../utils/add-equipe.service';
import { AddProjetoService } from '../../utils/add-projeto.service';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.scss'
})
export class CreateAreaComponent {
  @Input('exec') exec: number = 0;
  @Input('text') text: string = '';

  constructor(
    private equipe: AddEquipeService,
    private projeto: AddProjetoService
  ) { }

  showForm() {
    if(this.exec == 1) {
      this.equipe.addEquipe.next(true);
    }

    if(this.exec == 2) {
      this.projeto.addProjeto.next(true);
    }
  }
}
