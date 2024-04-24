import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AddProjetoService } from '../../../utils/add-projeto.service';
import { Projeto } from '../../../interfaces/projeto';
import { Equipe } from '../../../interfaces/equipe';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent implements OnInit{
  adicionandoProjeto: boolean = false;

  nome: string = '';
  codigoAcesso: string = '';
  idequipe: string = '';

  public equipesSelect: Equipe[] = [];
  disableSelectEquipe: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projetos: AddProjetoService
  ) {

  }

  async ngOnInit() {
    this.getEquipes();

    this.route.data.subscribe((data: Data) => {
      if(data['idequipe']) {
        this.idequipe = data['idequipe'];
        this.disableSelectEquipe = true;
      }
    });

    this.addProjetoEventWatcher();
  }

  getEquipes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.equipesSelect = [
        {idequipe: 1, idstatus: 1, nome: 'Equipe 1'},
        {idequipe: 2, idstatus: 2, nome: 'Equipe 2'},
        {idequipe: 3, idstatus: 3, nome: 'Equipe 3'}
      ];

      resolve(true);
    });
  }

  addProjetoEventWatcher() {
    this.projetos.addProjeto.subscribe((value) => {
      this.adicionandoProjeto = true;
    });
  }

  // Evento do formulário para adição do projeto
  adicionarProjeto() {

    if(this.nome.trim() == '')
      return

    if(this.idequipe == '')
      return;

    if(this.codigoAcesso == '')
      return;

    const projeto: Projeto = {
      codigo: Number(this.codigoAcesso),
      identificador: '',
      idequipe: Number(this.idequipe),
      idprojeto: -1,
      idstatus: 1, 
      nome: this.nome
    }

    this.postProjeto(projeto);
  }

  // Cria um novo projeto
  postProjeto(infos: Projeto) {
    console.log(infos);
    // http...
    this.clearFields();
  }

  // Limpar os campos após a criação
  clearFields() {
    this.adicionandoProjeto = false;
    this.idequipe = '';
    this.nome = '';
    this.codigoAcesso = '';
  }

  // Cancelar a criação do novo registro
  cancelarProjeto() {
    this.adicionandoProjeto = false;
  }
}
