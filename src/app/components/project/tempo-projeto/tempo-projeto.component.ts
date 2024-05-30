import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import { DiasTempo, DiasTempoHTTP } from '../../../interfaces/dias-tempo';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

import { ConversorService } from '../../../utils/conversor.service';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { TempoDominio } from '../../../interfaces/api/tempo-dominio';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { GetInfosByIdprojeto } from '../../../interfaces/api/get-infos-by-idprojeto';
import { Observable, timer } from 'rxjs';
import { ControleFiltragem } from '../../../interfaces/regrasfiltragem';
import { OrdenadorService } from '../../../utils/ordenador.service';

@Component({
  selector: 'app-tempo-projeto',
  templateUrl: './tempo-projeto.component.html',
  styleUrl: './tempo-projeto.component.scss'
})
export class TempoProjetoComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions> | null = null;
  
  temposDominios: TempoDominio[] = [];
  temposDominiosHtml: TempoDominio[] = [];

  dialogKey: string = 'di-projeto-atual';

  timerProjeto: any;
  
  reloadTime: string = '60';
  showBy: string = '2';

  dataInicial: string = '';
  dataFinal: string = '';

  // Controle de ordenação dos domínios
  ordenaTempoList: ControleFiltragem = {
    limite: '5',
    indice: '0',
    posFiltro: (lsi: any[]) => {
      const ls = this.ordenador.sliceFunction(lsi, this.ordenaTempoList.limite);
      this.setDominios(ls);
    },
    filtra: () => {
      const pos = this.ordenaTempoList.regras[Number(this.ordenaTempoList.indice)];
      const lsi = this.ordenador.funcBuilder(this.temposDominios, pos.ordem, pos.key);
      this.ordenaTempoList.posFiltro(lsi);
    },
    regras: [
      { label: 'Maior tempo de navegação', indice: '0', ordem: 1, key: 'tempo' },
      { label: 'Menor tempo de navegação', indice: '1', ordem: 2, key: 'tempo' }
    ]
  }
  
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
    this.getInfosDominioPorTempo();
    // this.getInfosDominioPorDia();
    this.timerSet();
    this.setDatasIniciais();
  }

  // retorna as informações de tempo por domínio pesquisado
  getInfosDominioPorTempo() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoTempoDominios, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Array) {
          const infos = <TempoDominio[]>value.data
          this.temposDominios = infos.slice();
          this.changeOrder(this.ordenaTempoList);
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
    if(this.timerProjeto && this.timerProjeto.unsubscribe){
      this.timerProjeto.unsubscribe();
    }

    const step = Number(this.reloadTime);
    if(step == -1)
      return;

    this.timerProjeto = timer((step * 1000), (step * 1000)).subscribe(() => {
      this.getInfosDominioPorTempo();
    });
  }

  buildCharts() {
    this.charTempoPorDominios();
  }
  charTempoPorDominios() {
    const infos = this.temposDominiosHtml;
    
    let mapped: number[] = [];
    const cod = this.showBy != '' ? Number(this.showBy) : 1;
    switch (cod) {
      case 1:
        mapped = infos.map(e => Number(e.tempo)).map(e => this.conversor.msToSeg(e));
        break;
      case 2:
        mapped = infos.map(e => Number(e.tempo)).map(e => this.conversor.msToMin(e));
        break;
      case 3:
        mapped = infos.map(e => Number(e.tempo)).map(e => this.conversor.msToHour(e));
        break;
      default:
        mapped = infos.map(e => Number(e.tempo)).map(e => this.conversor.msToMin(e));
        break;
    }

    this.chartOptions = {
      series: [
        {
          name: "tempo",
          data: mapped
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: infos.map(e => e.dominio)
      }
    };
  }

  getFullTime(): number {
    if(this.temposDominios.length)
    return this.temposDominios.map(e => Number(e.tempo)).reduce((p = 0, c) => p += c, 0);

    return 0;
  }

  ngOnDestroy(): void {
    this.timerProjeto.unsubscribe();
  }


  setDominios(dominios: TempoDominio[]) {
    this.temposDominiosHtml = dominios;
    this.buildCharts();
  }

  changeOrder(vetorOrdenacao: ControleFiltragem) {
    vetorOrdenacao.filtra();
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
