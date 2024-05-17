import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdenadorService {

  constructor() { }

  // tipo 1 = ordenação decrescente
  // tipo 2 = ordenação crescente
  funcBuilder(vetorInput: any[], tipo: 1 | 2, key: string = '') {
    let vetor = vetorInput.slice();
    let retorno = [];

    if(tipo == 1) {
      retorno = vetor.sort((a, b) => Number(a[key]) > Number(b[key]) ? -1 : 1);
    }

    if(tipo == 2) {
      retorno = vetor.sort((a, b) => Number(a[key]) > Number(b[key]) ? 1 : -1);
    }

    return retorno;
  }

  // recorta o vetor
  sliceFunction(inputVetor: any[], limite: string) {
    const sliceEnd = +limite;
    const registros = inputVetor.slice();

    if(registros.length < sliceEnd || sliceEnd == 0) {
      return registros.map(e => e);
    } else {
      return registros.slice(0, sliceEnd).slice();
    }
  }
}
