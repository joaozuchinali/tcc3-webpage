import { Injectable } from '@angular/core';
import { CurrentProjetoService } from './current-projeto.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearProjetoService implements Resolve<any> {

  constructor(
    private current: CurrentProjetoService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean {
    console.log(state.url);

    if(state.url.includes('/visao-geral') || state.url.includes('/usuarios-pesquisados') || state.url.includes('/dominios') || state.url.includes('/tempo')) 
    return false;

    this.current.clear();
    return true;
  }
}