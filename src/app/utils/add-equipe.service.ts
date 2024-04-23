import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEquipeService {
  addEquipe = new Subject<boolean>();
}
