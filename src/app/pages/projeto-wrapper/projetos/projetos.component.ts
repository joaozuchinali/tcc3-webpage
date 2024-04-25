import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AddProjetoService } from '../../../utils/add-projeto.service';
import { Projeto } from '../../../interfaces/projeto';
import { Equipe } from '../../../interfaces/equipe';
import { CurrentEquipeService } from '../../../utils/current-equipe.service';
import { Equipescredenciadas } from '../../../interfaces/equipescredenciadas';
import { DialogCentralService } from '../../../utils/dialog-central.service';

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

  equipesSelect: Equipescredenciadas[] = [];
  disableSelectEquipe: boolean = false;
  disableCreateProjeto: boolean = false;
  equipeParam: Equipe | null = null;

  projetosAtuais: Projeto[] = [];

  dialogKey = 'di-projetos';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projetosWatcher: AddProjetoService,
    private currentEquipe: CurrentEquipeService,
    private dialogService: DialogCentralService
  ) {

  }

  async ngOnInit() {
    const equipeFilter = this.currentEquipe.get();
    if(equipeFilter.idequipe != -1) {
      this.equipeParam = equipeFilter;
      this.idequipe = String(equipeFilter.idequipe);
      this.disableSelectEquipe = true;

      this.getProjetosEquipe();
    } else {
      this.getProjetosUsuario();
    }

    this.getEquipes();
    this.addProjetoEventWatcher();
  }

  // Retorna todas as equipes com as quais o usuário está relacionado
  getEquipes(): void  {
    // http get
    this.equipesSelect = [
      {idequipe: 1, idstatus: 1, nome: 'Equipe 1', idcredencial: 2},
      {idequipe: 2, idstatus: 2, nome: 'Equipe 2', idcredencial: 1},
      {idequipe: 3, idstatus: 3, nome: 'Equipe 3', idcredencial: 2}
    ];

    this.verificaCredencialEquipe();
  }

  // Configura o botão de adição do projeto em caso de ser
  // um redirecionamento da tela de equipe
  verificaCredencialEquipe(): void {
    let dis = false;

    if(!dis && this.equipeParam != null) {
      const vec = this.equipesSelect.filter(e => e.idequipe == this.equipeParam?.idequipe && e.idcredencial == 2);
      if(!Array.isArray(vec) || !vec.length) {
        dis = true;
      }
    } 

    if(!dis && this.idequipe != '') {
      const vec = this.equipesSelect.filter(e => e.idequipe == Number(this.idequipe) && e.idcredencial == 2);
      if(!Array.isArray(vec) || !vec.length) {
        dis = true;
      }
    }

    this.disableCreateProjeto = dis;
  }

  // Verifica quando clicou em criar
  addProjetoEventWatcher() {
    this.projetosWatcher.addProjeto.subscribe((value) => {
      this.adicionandoProjeto = true;
    });
  }

  // Evento do formulário para adição do projeto
  addprojetoconfirm() {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja adicionar um projeto?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.adicionarProjeto() });
  }
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

  getProjetosEquipe(): void {
    // http get
    this.projetosAtuais = [
      {codigo: 1, identificador: 'X', idequipe: 1, idprojeto: 1, idstatus: 1, nome: 'Projeto 10'},
      {codigo: 1, identificador: 'Y', idequipe: 2, idprojeto: 2, idstatus: 1, nome: 'Projeto 20'},
      {codigo: 1, identificador: 'Z', idequipe: 3, idprojeto: 3, idstatus: 1, nome: 'Projeto 30'}
    ]
  }

  getProjetosUsuario(): void {
    // http get
    this.projetosAtuais = [
      {codigo: 1, identificador: 'X', idequipe: 1, idprojeto: 1, idstatus: 1, nome: 'Projeto 01'},
      {codigo: 1, identificador: 'Y', idequipe: 2, idprojeto: 2, idstatus: 1, nome: 'Projeto 02'},
      {codigo: 1, identificador: 'Z', idequipe: 3, idprojeto: 3, idstatus: 1, nome: 'Projeto 03'}
    ]
  }

  // Desmarca uma equipe seleciona através de redirecionamento
  desmarcarEquipe() {
    this.equipeParam = null;
    this.disableSelectEquipe = false;
    this.getProjetosUsuario();
  }
}