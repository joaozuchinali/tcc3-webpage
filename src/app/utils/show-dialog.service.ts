import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dialoginfos } from '../interfaces/dialoginfos';

@Injectable({
  providedIn: 'root'
})
export class ShowDialogService {
  show = new Subject<Dialoginfos>();
  info = new Subject<{ value: any, key: string}>();
}
