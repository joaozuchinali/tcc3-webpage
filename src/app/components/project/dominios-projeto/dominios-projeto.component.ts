import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversorService } from '../../../utils/conversor.service';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { ProjetoInfosDominio } from '../../../interfaces/api/get-projeto-infos-dominio';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { GetInfosByIdprojeto } from '../../../interfaces/api/get-infos-by-idprojeto';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dominios-projeto',
  templateUrl: './dominios-projeto.component.html',
  styleUrl: './dominios-projeto.component.scss'
})
export class DominiosProjetoComponent implements OnInit, OnDestroy {

  dialogKey: string = 'di-projeto-atual';

  dominiosList: ProjetoInfosDominio[] = [];
  dominiosListHtml: ProjetoInfosDominio[] = [];
  limite: string = '';
  ordenacao: string = '';

  timerDominios: any;
  
  constructor(
    public conversor: ConversorService,
    private currentProject: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService
  ) {

  }

  ngOnInit(): void {
    this.getDominios();
    this.timerSet();
  }

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
          this.dominiosListHtml = infos.map(e => e);

          if(this.ordenacao != '' || this.limite != '') {
            this.changeOrder();
          }
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

  timerSet() {
    this.timerDominios = timer(20000, 20000).subscribe(() => {
      this.getDominios();
    });
  }

  setDominios(dominios: ProjetoInfosDominio[]) {
    this.dominiosListHtml = dominios;
  }

  changeOrder() {
    const cod = this.ordenacao != '' ? Number(this.ordenacao) : 0;
    let list = this.dominiosList.map(e => e);

    switch (cod) {
      // Maior por tempo
      case 1:
        list = list.sort((a, b) => Number(a.tempo) > Number(b.tempo) ? -1 : 1);
        break;
      // Maior por pesquisas
      case 2:
        list = list.sort((a, b) => Number(a.pesquisas) > Number(b.pesquisas) ? -1 : 1);
        break;
      // Maior por usuarios
      case 3:
        list = list.sort((a, b) => Number(a.usuarios) > Number(b.usuarios) ? -1 : 1);
        break;
      // Menor por tempo
      case 4:
        list = list.sort((a, b) => Number(a.tempo) > Number(b.tempo) ? 1 : -1);
        break;
      // Menor por pesquisa
      case 5:
        list = list.sort((a, b) => Number(a.pesquisas) > Number(b.pesquisas) ? 1 : -1);
        break;
      // Menor por usuário
      case 6:
        list = list.sort((a, b) => Number(a.pesquisas) > Number(b.pesquisas) ? 1 : -1);
        break;
      default:
        break;
    }

    list = this.sliceDominios(list);
    this.setDominios(list);
  }

  sliceDominios(inputDominios: ProjetoInfosDominio[]) {
    const sliceEnd = this.limite != '' ? Number(this.limite) : 0;
    const dominios = inputDominios.map(e => e);

    if(dominios.length < sliceEnd || sliceEnd == 0) {
      return dominios.map(e => e);
    } else {
      return dominios.slice(0, sliceEnd).map(e => e);
    }
  }

  changeCard(item: ProjetoInfosDominio) {
    item.full = !item.full;
  }

  ngOnDestroy(): void {
    this.timerDominios.unsubscribe();
  }
}
