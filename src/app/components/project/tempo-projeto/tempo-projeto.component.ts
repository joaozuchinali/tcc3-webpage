import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-tempo-projeto',
  templateUrl: './tempo-projeto.component.html',
  styleUrl: './tempo-projeto.component.scss'
})
export class TempoProjetoComponent implements OnInit{
  public chartOptions!: Partial<ChartOptions>;

  listaDiasTempo: DiasTempo[] = [];
  dataInicial: string = '';
  dataFinal: string = '';
  
  constructor(
    public conversor: ConversorService
  ) {
    
  }

  ngOnInit(): void {
    this.buildCharts();
    this.buildDias();
  }

  buildCharts() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
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
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };
  }

  buildDias() {
    this.listaDiasTempo = [
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'},
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'},
      { data: '22/04/2024', dia: 'Dom', pesquisas: '33', total: 72383287, usuarios: '33'}
    ]
  }
}
