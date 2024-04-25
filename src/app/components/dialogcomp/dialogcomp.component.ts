import { Component, Input, OnInit } from '@angular/core';
import { ShowDialogService } from '../../utils/show-dialog.service';
import { Dialoginfos } from '../../interfaces/dialoginfos';

@Component({
  selector: 'app-dialogcomp',
  templateUrl: './dialogcomp.component.html',
  styleUrl: './dialogcomp.component.scss'
})
export class DialogcompComponent implements OnInit{
  @Input('key') key: string = '';

  infoslocal?: Dialoginfos;
  exib: boolean = false;

  constructor(
    private showDialogService: ShowDialogService
  ) {
    
  }

  ngOnInit(): void {
    this.showDialogService.show.subscribe((values: Dialoginfos) => {
      if(values.key == this.key) {
        this.show(values);
      }
    });
  }

  show(values: Dialoginfos) {
    this.infoslocal = values;
    this.exib = true;
  }

  refuse() {
    this.exib = false;
    this.showDialogService.info.next({key: this.key, value: false});
  }

  confirm() {
    this.exib = false;
    this.showDialogService.info.next({key: this.key, value: true});
  }

  close() {
    this.exib = false;
    this.showDialogService.info.next({key: this.key, value: -1});
  }
}
