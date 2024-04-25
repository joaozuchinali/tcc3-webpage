import { Injectable } from '@angular/core';
import { ShowDialogService } from './show-dialog.service';
import { Subscribable, Subscription } from 'rxjs';
import { Dialoginfos } from '../interfaces/dialoginfos';

@Injectable({
  providedIn: 'root'
})
export class DialogCentralService {
  private infos?: Dialoginfos;
  private successFn: () => any = () => {};
  private cancelFn: () => any = () => {};
  private subs?: Subscription;

  constructor(
    private showDialogService: ShowDialogService
  ) { }

  // Recebe as configurações do alerta
  config(
      infos: Dialoginfos,
      fn1: () => any = () => {}, 
      fn2: () => any = () => {}
  ) {
    this.infos = infos;

    this.successFn = fn1;
    this.cancelFn  = fn2;

    this.handler();
  }

  // Chama o alerta
  private handler() {
    if(this.infos == undefined)
    return;

    this.showDialogService.show.next(this.infos);

    // Escuta o evento de click no alerta
    this.subs = this.showDialogService.info.subscribe((data) => {
      if(data.key == this.infos!.key && data.value == true) {
        this.successFn();

        if(this.subs) {
          this.subs.unsubscribe();
        }
      }

      if(data.key == this.infos!.key && data.value == true) {
        this.cancelFn();

        if(this.subs) {
          this.subs.unsubscribe();
        }
      }

      if(data.key == this.infos!.key && data.value == -1) {
        if(this.subs) {
          this.subs.unsubscribe();
        }
      }
    });
  }

  unsub() {
    if(this.subs) {
      this.subs.unsubscribe();
    }
  }
}
