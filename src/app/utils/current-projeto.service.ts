import { Injectable } from '@angular/core';
import { Projeto } from '../interfaces/projeto';
import { LocalStorageService } from 'angular-web-storage';
import { CurrentStorage } from '../interfaces/current-storage';

@Injectable({
  providedIn: 'root'
})
export class CurrentProjetoService implements CurrentStorage {
  private current: Projeto = {codigo: -1, identificador: '', idequipe: -1, idprojeto: -1, idstatus: -1, nome: ''};
  private key: string = 'projeto-atual';

  constructor(
    private local: LocalStorageService
  ) { }

  // Define o projeto atual
  set(info: Projeto, ignore: boolean = false): void {
    this.current = info;

    if(ignore == false)
    this.setLocalStorage(info);
  }

  // Salva o registro em localstorage
  setLocalStorage(info: Projeto): void {
    this.local.set(this.key, info, 0, 'w');
  }

  // Retorna o projeto atual
  get(): Projeto {
    if(this.current.idequipe == -1) {
      const saved = this.getLocal();
      if(saved) {
        this.set(saved, true);
      } else {
        this.current = {codigo: -1, identificador: '', idequipe: -1, idprojeto: -1, idstatus: -1, nome: ''};
      }
    }

    return this.current;
  }

  // Retorna o projeto salvo no local storage
  getLocal() {
    const value = this.local.get(this.key);
    return value;
  }

  // Limpa a equipe atual
  clear(): void {
    this.current = {codigo: -1, identificador: '', idequipe: -1, idprojeto: -1, idstatus: -1, nome: ''};
    this.local.remove(this.key);
  }
}
