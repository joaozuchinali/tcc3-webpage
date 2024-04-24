import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentEquipeService } from './current-equipe.service';

@Injectable({ providedIn: "root" })
export class ClearEquipeService implements Resolve<any> {

  constructor(
    private currentEquipe: CurrentEquipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean {
    this.currentEquipe.clearEquipe();
    return true;
  }
}
