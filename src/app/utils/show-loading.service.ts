import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loadinginfos } from '../interfaces/loadinginfos';

@Injectable({
  providedIn: 'root'
})
export class ShowLoadingService {
  show = new Subject<Loadinginfos>();
  hide = new Subject<Loadinginfos>();
}