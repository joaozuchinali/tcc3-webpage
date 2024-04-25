import { Injectable } from '@angular/core';
import { CurrentProjetoService } from './current-projeto.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearProjetoService implements Resolve<any> {

  constructor(
    private current: CurrentProjetoService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean {
    this.current.clear();
    return true;
  }
}