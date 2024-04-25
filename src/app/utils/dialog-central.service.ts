import { Injectable } from '@angular/core';
import { ShowDialogService } from './show-dialog.service';
import { Subscribable, Subscription } from 'rxjs';
import { Dialoginfos } from '../interfaces/dialoginfos';

@Injectable({
  providedIn: 'root'
})
export class DialogCentralService {
  private text: string = '';
  private dialogKey: string = '';
  private title: string = '';
  
  private successFn: () => any = () => {};
  private cancelFn: () => any = () => {};
  private subs?: Subscription;

  constructor(
    private dialogService: ShowDialogService
  ) { }

  config(
      infos: Dialoginfos,
      fn1: () => any, 
      fn2: () => any = () => {}
  ) {
    this.text = infos.text;
    this.dialogKey = infos.key;
    this.title = infos.title;

    this.successFn = fn1;
    this.cancelFn  = fn2;

    this.handler();
  }

  handler() {
    this.dialogService.show.next({ key: this.dialogKey, text: this.text, title: this.title});

    this.subs = this.dialogService.info.subscribe((data) => {
      if(data.key == this.dialogKey && data.value == true) {
        this.successFn();

        if(this.subs)
        this.subs.unsubscribe();
      }

      if(data.key == this.dialogKey && data.value == true) {
        this.cancelFn();

        if(this.subs)
        this.subs.unsubscribe();
      }
    });
  }

  unsub() {
    if(this.subs)
    this.subs.unsubscribe();
  }
}
