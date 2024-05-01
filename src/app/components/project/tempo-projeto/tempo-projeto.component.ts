import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexStroke
} from "ng-apexcharts";
import { DiasTempo } from '../../../interfaces/dias-tempo';

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

@Component({
  selector: 'app-tempo-projeto',
  templateUrl: './tempo-projeto.component.html',
  styleUrl: './tempo-projeto.component.scss'
})
export class TempoProjetoComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions> | null = null;

  listaDiasTempo: DiasTempo[] = [];
  temposDominios: TempoDominio[] = [];
  dialogKey: string = 'di-projeto-atual';

  dataInicial: string = '';
  dataFinal: string = '';
  timerProjeto: any;
  
  constructor(
    public conversor: ConversorService,
    private currentProject: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService
  ) {
    
  }

  ngOnInit(): void {
    this.getInfosDominioPorTempo();
    this.buildDias();
    this.timerSet();
  }

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
          this.temposDominios = infos;
          this.buildCharts();
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
    this.timerProjeto = timer(20000, 20000).subscribe(() => {
      this.getInfosDominioPorTempo();
    });
  }

  buildCharts() {
    const infos = this.temposDominios.sort((a, b) => Number(a.tempo) > Number(b.tempo) ? -1 : 1);
    
    this.chartOptions = {
      series: [
        {
          name: "tempo",
          data: infos.map(e => Number(e.tempo)).map(e => this.conversor.msToHour(e))
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

  buildDias() {
    this.listaDiasTempo = [
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'},
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'},
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'}
    ]
  }

  ngOnDestroy(): void {
    this.timerProjeto.unsubscribe();
  }
}
