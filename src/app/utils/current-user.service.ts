import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import { CurrentStorage } from '../interfaces/current-storage';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService implements CurrentStorage {

  private current: User = {email: '', idstatus: 0, nome: '', senha: '', idusuario: -1};
  private key = 'current-user';
  
  constructor(
    private local: LocalStorageService
  ) { 

  }

  // Salva um usuário
  set(info: User, ignore: boolean = false): void {
    this.current = info;

    if(ignore == false)
    this.setLocalStorage(info);
  }

  // Salva o registro em localstorage
  setLocalStorage(info: User): void {
    this.local.set(this.key, info, 0, 'w');
  }

  // Retorna o usuário e atualzia em caso de refresh
  get() {
    if(this.current.idusuario == -1) {
      const saved = this.getLocal();
      if(saved) {
        this.set(saved, true);
      } else {
        this.current = {email: '', idstatus: 0, nome: '', senha: '', idusuario: -1};
      }
    }
    
    return this.current;
  }

  // Retorna o usuário salvo no local storage
  getLocal() {
    const value = this.local.get(this.key);
    return value;
  }
}
