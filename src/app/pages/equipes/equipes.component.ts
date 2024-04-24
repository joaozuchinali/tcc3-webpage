import { Component, OnInit } from '@angular/core';
import { AddEquipeService } from '../../utils/add-equipe.service';
import { CurrentUserService } from '../../utils/current-user.service';
import { Equipe } from '../../interfaces/equipe';
import { Equipeuso } from '../../interfaces/equipeuso';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.scss'
})
export class EquipesComponent implements OnInit{
  adicionandoEquipe: boolean = false;
  nomeEquipe: string = '';

  constructor(
    private addequipe: AddEquipeService,
    private currentUser: CurrentUserService
  ) {

  }

  ngOnInit(): void {
    this.addEquipesEventWatcher();
  }

  addEquipesEventWatcher() {
    this.addequipe.addEquipe.subscribe((value) => {
      this.adicionandoEquipe = true;
    });
  }

  adicionarEquipe() {
    console.log(this.nomeEquipe);

    if(this.nomeEquipe.trim() != '') {
      const newEquipe: Equipe = {nome: this.nomeEquipe, idstatus: -1, idequipe: -1}
      this.postEquipe(newEquipe);
    } else {

    }
  }
  // Cria uma nova equipe
  postEquipe(infos: Equipe) {
    // http post
    const equipeCriada: Equipe = {
      idequipe: -1, 
      idstatus: 1, 
      nome: 'teste'
    };

    const usuario = this.currentUser.getUser();

    const equipeUso: Equipeuso = { 
      idcredencial: 1, 
      idequipe: equipeCriada.idequipe, 
      idusuario: usuario.idusuario
    }

    this.postEquipeUso(equipeUso)
  }
  // Cria uma relação entre a equipe e o usuário
  postEquipeUso(infos: Equipeuso) {
    // http post
    console.log(infos);
    this.clearFields();
  }

  // Limpar os campos após a criação
  clearFields(): void {
    this.nomeEquipe = '';
    this.adicionandoEquipe = false;
  }

  // Cancelar a criação do novo registro
  cancelarAdd() {
    this.nomeEquipe = '';
    this.adicionandoEquipe = false;
  }
}
