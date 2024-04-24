import { Component, OnInit } from '@angular/core';
import { AddEquipeService } from '../../utils/add-equipe.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.scss'
})
export class EquipesComponent implements OnInit{
  adicionandoEquipe: boolean = false;

  constructor(
    private addequipe: AddEquipeService
  ) {

  }

  ngOnInit(): void {
    this.addEquipes();
  }

  addEquipes() {
    const subs = this.addequipe.addEquipe.subscribe((value) => {
      this.adicionandoEquipe = true;
    });
  }

  cancelarEquipe() {
    this.adicionandoEquipe = false;
  }
}
