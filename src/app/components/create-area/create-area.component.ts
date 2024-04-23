import { Component, Input } from '@angular/core';
import { AddEquipeService } from '../../utils/add-equipe.service';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.scss'
})
export class CreateAreaComponent {
  @Input('exec') exec: number = 0;
  @Input('text') text: string = '';

  constructor(
    private addequipe: AddEquipeService
  ) { }

  showForm() {
    if(this.exec == 1) {
      this.addequipe.addEquipe.next(true);
    }
  }
}
