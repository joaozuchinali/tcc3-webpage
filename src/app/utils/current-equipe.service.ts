import { Injectable } from '@angular/core';
import { Equipe } from '../interfaces/equipe';
import { Subject } from 'rxjs';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class CurrentEquipeService {
  private currentEquipe: Equipe = {idequipe: -1, idstatus: -1, nome: ''};
  private key: string = 'equipe-atual';

  constructor(
    private local: LocalStorageService
  ) { }

  // Define a equipe atual
  setEquipe(info: Equipe, ignore: boolean = false): void {
    this.currentEquipe = info;

    if(ignore == false)
    this.setLocalStorage(info);
  }

  // Salva o registro em localstorage
  private setLocalStorage(userinfo: Equipe): void {
    this.local.set(this.key, userinfo, 0, 'w');
  }

  // Retorna a equipe atual
  getEquipe(): Equipe {
    if(this.currentEquipe.idequipe == -1) {
      const saved = this.getLocal();
      if(saved) {
        this.setEquipe(saved, true);
      } else {
        this.currentEquipe = {idequipe: -1, idstatus: -1, nome: ''};
      }
    }

    return this.currentEquipe;
  }

  // Retorna o usuário salvo no local storage
  private getLocal() {
    const value = this.local.get(this.key);
    return value;
  }

  // Limpa a equipe atual
  clearEquipe(): void {
    this.currentEquipe = {idequipe: -1, idstatus: -1, nome: ''};
    this.local.remove(this.key);
  }
}
