import { Component, OnInit } from '@angular/core';
import { DominiosPesquisados } from '../../../interfaces/dominios-pesquisados';
import { ConversorService } from '../../../utils/conversor.service';

@Component({
  selector: 'app-dominios-projeto',
  templateUrl: './dominios-projeto.component.html',
  styleUrl: './dominios-projeto.component.scss'
})
export class DominiosProjetoComponent implements OnInit {

  dominiosList: DominiosPesquisados[] = [];
  limite: string = '';
  ordencao: string = '';
  
  constructor(
    public conversor: ConversorService
  ) {

  }

  ngOnInit(): void {
    this.buildDominios();
  }

  buildDominios() {
    this.dominiosList = [
      { full: false, nome: 'exemplo.com.br', pesquisas: 33, tempo: 11281281298, usuarios: 33},
      { full: false, nome: 'exemplo2.com.br', pesquisas: 33, tempo: 11281281298, usuarios: 33},
      { full: false, nome: 'exemplo3.com.br', pesquisas: 33, tempo: 11281281298, usuarios: 33}
    ]
  }

  changeCard(item: DominiosPesquisados) {
    item.full = !item.full;
  }
}
