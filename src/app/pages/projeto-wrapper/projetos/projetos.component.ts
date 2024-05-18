import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AddProjetoService } from '../../../utils/add-projeto.service';
import { Projeto } from '../../../interfaces/projeto';
import { Equipe } from '../../../interfaces/equipe';
import { CurrentEquipeService } from '../../../utils/current-equipe.service';
import { Equipescredenciadas } from '../../../interfaces/equipescredenciadas';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { Equipesget } from '../../../interfaces/api/equipes-get';
import { CurrentUserService } from '../../../utils/current-user.service';
import { ProjetoCreate } from '../../../interfaces/api/projeto-create';
import { ProjetoGetByUser } from '../../../interfaces/api/projeto-get-by-user';
import { ProjetoGetByEquipe } from '../../../interfaces/api/projeto-get-by-equipe';
import { ListProjetosService } from '../../../utils/list-projetos.service';
import { ShowLoadingService } from '../../../utils/show-loading.service';

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
  loadingKey = 'lo-projetos';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projetosWatcher: AddProjetoService,
    private currentEquipe: CurrentEquipeService,
    private currentUser: CurrentUserService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private listProjeto: ListProjetosService,
    private apiUrls: ApiUrlsService,
    private showLoadingService: ShowLoadingService
  ) {

  }

  async ngOnInit() {
    const equipeFilter = this.currentEquipe.get();
    if(equipeFilter.idequipe != -1) {
      this.equipeParam = equipeFilter;
      this.idequipe = String(equipeFilter.idequipe);
      this.disableSelectEquipe = true;
    }

    this.projetosLoad();
    this.getEquipes();
    this.addProjetoEventWatcher();

    this.listProjeto.list.subscribe((e) => {
      this.projetosLoad();
    });
  }

  private projetosLoad() {
    const equipeFilter = this.currentEquipe.get();
    if(equipeFilter.idequipe != -1) {
      this.getProjetosEquipe();
    } else {
      this.getProjetosUsuario();
    }
  }

  // Retorna todas as equipes com as quais o usuário está relacionado
  getEquipes(): void  {
    const user = this.currentUser.get();
    const queryinfo: Equipesget = {
      idstatus: 1,
      idusuario: user.idusuario
    };

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getEquipes, queryinfo)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Array) {
          this.equipesSelect = <Equipescredenciadas[]>value.data;
          this.verificaCredencialEquipe();
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
        }
      }
    });
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
    if(this.nome.trim() == '' || this.idequipe.trim() == '' || this.codigoAcesso.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Prencha todos os campos antes de adicionar o projeto!', 
        title: 'Campos vazios',
        type: 'message'
      });
      return;
    }

    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja adicionar um projeto?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.adicionarProjeto() });
  }
  adicionarProjeto() {
    this.showLoadingService.show.next({key: this.loadingKey});

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
    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.createProjeto, infos)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Object && value.status == 'success') {
          this.clearFields();
          this.projetosLoad();
        }

        this.showLoadingService.hide.next({key: this.loadingKey});
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível cadastrar o novo projeto!', 
            title: 'Erro de cadastro',
            type: 'message'
          });
        }

        this.showLoadingService.hide.next({key: this.loadingKey});
      }
    });
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

  // Retorna todos os projetos da equipe que redirecionou para a tela do usuário
  getProjetosEquipe(): void {
    const query: ProjetoGetByEquipe = {
      idstatus: 1,
      idequipe: this.equipeParam!.idequipe
    };

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getProjetosEquipe, query)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Array) {
          this.projetosAtuais = <Projeto[]>value.data;
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
        }
      }
    });
  }

  // Retorna todos os projetos do usuário
  getProjetosUsuario(): void {
    const user = this.currentUser.get();
    const query: ProjetoGetByUser = {
      idstatus: 1,
      idusuario: user.idusuario
    };

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.getProjetosUsuario, query)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.data instanceof Array) {
          this.projetosAtuais = <Projeto[]>value.data;
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
        }
      }
    });
  }

  // Desmarca uma equipe seleciona através de redirecionamento
  desmarcarEquipe() {
    this.currentEquipe.clear();
    this.equipeParam = null;
    this.disableSelectEquipe = false;
    this.projetosLoad();
  }
}