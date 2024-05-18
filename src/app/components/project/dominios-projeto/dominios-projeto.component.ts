import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversorService } from '../../../utils/conversor.service';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { ProjetoInfosDominio, ProjetoInfosTopoDominio, ProjetosDia, ProjetosDiaLs } from '../../../interfaces/api/get-projeto-infos-dominio';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { GetInfosByIdprojeto } from '../../../interfaces/api/get-infos-by-idprojeto';
import { timer } from 'rxjs';
import { OrdenadorService } from '../../../utils/ordenador.service';
import { ControleFiltragem, Regrasfiltragem } from '../../../interfaces/regrasfiltragem';

@Component({
  selector: 'app-dominios-projeto',
  templateUrl: './dominios-projeto.component.html',
  styleUrl: './dominios-projeto.component.scss'
})
export class DominiosProjetoComponent implements OnInit, OnDestroy {

  dialogKey: string = 'di-projeto-atual';

  dominiosList: ProjetoInfosDominio[] = [];
  dominiosListHtml: ProjetoInfosDominio[] = [];

  topoList: ProjetoInfosTopoDominio[] = [];
  topoListhtml: ProjetoInfosTopoDominio[] = []

  listaDiasPesquisa: ProjetosDiaLs[] = [];
  listaDiasPesquisaHtml: ProjetosDiaLs[] = [];

  limite: string = '';
  ordenacao: string = '';
  
  dataInicial: string = '';
  dataFinal: string = '';

  // Controle de ordenação dos domínios
  ordenaDominiosList: ControleFiltragem = {
    limite: '5',
    indice: '0',
    posFiltro: (lsi: any[]) => {
      const ls = this.ordenador.sliceFunction(lsi, this.ordenaDominiosList.limite);
      this.setDominios(ls);
    },
    filtra: () => {
      const pos = this.ordenaDominiosList.regras[Number(this.ordenaDominiosList.indice)];
      const lsi = this.ordenador.funcBuilder(this.dominiosList, pos.ordem, pos.key);
      this.ordenaDominiosList.posFiltro(lsi);
    },
    regras: [
      { label: 'Maior quantidade de pesquisas', indice: '0', ordem: 1, key: 'pesquisas' },
      { label: 'Maior quantidade de usuários que acessaram', indice: '1', ordem: 1, key: 'usuarios' },
      { label: 'Menor quantidade de pesquisas', indice: '2', ordem: 2, key: 'pesquisas' },
      { label: 'Menor quantidade de usuários que acessaram', indice: '3', ordem: 2, key: 'usuarios' }
    ]
  }

  // Controle de ordenação dos topos
  ordenaToposList: ControleFiltragem = {
    limite: '5',
    indice: '0',
    posFiltro: (lsi: any[]) => {
      const ls = this.ordenador.sliceFunction(lsi, this.ordenaToposList.limite);
      this.setTopos(ls);
    },
    filtra: () => {
      const pos = this.ordenaToposList.regras[Number(this.ordenaToposList.indice)];
      const lsi = this.ordenador.funcBuilder(this.topoList, pos.ordem, pos.key);
      this.ordenaToposList.posFiltro(lsi);
    },
    regras: [
      { label: 'Maior quantidade de pesquisas', indice: '0', ordem: 1, key: 'pesquisas' },
      { label: 'Menor quantidade de pesquisas', indice: '1', ordem: 2, key: 'pesquisas' },
    ]
  }


  timerDominios: any;
  reloadTime: string = '60';
  
  constructor(
    public conversor: ConversorService,
    private currentProject: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService,
    private ordenador: OrdenadorService
  ) {

  }

  ngOnInit(): void {
    this.setDatasIniciais();
    this.httpRequests();
    this.timerSet();
  }

  // Centralizador de todas as requisições http do componente
  // para a api, na busca das informações referentes ao domínio
  httpRequests() {
    this.getDominios();
    this.getDominiosTopo();
    this.getInfosDominioPorDia();
  }

  // Retorna as informações referentes aos domínios no geral
  getDominios() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoDominios, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Object) {
          const infos = (<ProjetoInfosDominio[]>value.data).map(e => {e.full = false; return e;});
          this.dominiosList = infos.map(e => e);
          // this.dominiosListHtml = infos.map(e => e);
          this.changeOrder(this.ordenaDominiosList);
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar os dados dos domínios.', 
            title: 'Dados não encontrados',
            type: 'message'
          });
        }
      }
    });
  }

  // Retorna as informações referentes ao domínio de topo
  getDominiosTopo() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoDominiosTopo, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Object) {
          const infos = (<ProjetoInfosTopoDominio[]>value.data).map(e => {e.full = false; return e;});
          this.topoList = infos.slice();
          this.changeOrder(this.ordenaToposList);
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar os dados dos domínios.', 
            title: 'Dados não encontrados',
            type: 'message'
          });
        }
      }
    });
  }

  // retorna as informações de tempo por dia pesquisado
  getInfosDominioPorDia() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoPesquisasDia, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Array) {
          const infos = <ProjetosDia[]>value.data
          this.buildDias(infos);
          this.setDiasPesquisa();
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar os dados dos dias pesquisados.', 
            title: 'Dados não encontrados',
            type: 'message'
          });
        }
      }
    });
  }

  buildDias(vetor: ProjetosDia[]) {
    const vetorShow = vetor.map((e) => {
      const diavec = e.diap.split('-').map(e => Number(e));
      const diaaux = new Date(diavec[0], diavec[1] - 1, diavec[2], 0, 0, 0, 0);
      
      return {
        data: e.diap.split('-').reverse().join('/'),
        pesquisas: String(e.pesquisas),
        dia: this.conversor.weekDayToAbrev(diaaux.getDay()),
      }
    });
    
    this.listaDiasPesquisa = vetorShow;
  }

  setDiasPesquisa() {
    console.log(this.dataFinal);
    console.log(this.dataInicial);

    this.listaDiasPesquisaHtml = this.listaDiasPesquisa.filter(e => {
      console.log(e);
      if (
          e.data.split('/').reverse().join('-') >= this.dataInicial && 
          e.data.split('/').reverse().join('-') <= this.dataFinal
        )
      return true;

      return false;
    });
  }

  timerSet() {
    if(this.timerDominios && this.timerDominios.unsubscribe){
      this.timerDominios.unsubscribe();
    }

    const step = Number(this.reloadTime);
    if(step == -1)
      return;

    this.timerDominios = timer((step * 1000), (step * 1000)).subscribe(() => {
      this.httpRequests();
    });
  }

  setDominios(dominios: ProjetoInfosDominio[]) {
    this.dominiosListHtml = dominios;
  }

  setTopos(dominios: ProjetoInfosTopoDominio[]) {
    this.topoListhtml = dominios;
  }

  changeOrder(vetorOrdenacao: ControleFiltragem) {
    vetorOrdenacao.filtra();
  }

  changeCard(item: ProjetoInfosDominio | ProjetoInfosTopoDominio ) {
    item.full = !item.full;
  }

  ngOnDestroy(): void {
    this.timerDominios.unsubscribe();
  }

  
  setDatasIniciais() {
    const week = 7 * 24 * 60 * 60 * 1000;
    const aux = new Date();
    const base = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate(), 0, 0, 0, 0);
    const dtup = new Date(base.getTime() + (week))
    const dtdown = new Date(base.getTime() - (week))
    this.dataInicial = (dtdown).toISOString().split('T')[0];
    this.dataFinal = (dtup).toISOString().split('T')[0];;
  }
}
