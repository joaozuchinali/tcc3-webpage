import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private current: User = {email: '', idstatus: 0, nome: '', senha: '', idusuario: -1};
  private key = 'current-user';
  
  constructor(
    private local: LocalStorageService
  ) { 

  }

  // Salva um usuário
  public setUser(userinfo: User, ignore: boolean = false): void {
    this.current = userinfo;

    if(ignore == false)
    this.setLocalStorage(userinfo);
  }

  // Salva o registro em localstorage
  private setLocalStorage(userinfo: User): void {
    this.local.set(this.key, userinfo, 0, 'w');
  }

  // Retorna o usuário e atualzia em caso de refresh
  public getUser() {
    if(this.current.idusuario == -1) {
      const saved = this.getLocal();
      this.setUser(saved, true);
    }
    
    return this.current;
  }

  // Retorna o usuário salvo no local storage
  private getLocal() {
    const value = this.local.get(this.key);
    return value;
  }
}
