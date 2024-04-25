import { Component, Input } from '@angular/core';
import { ShowDialogService } from '../../utils/show-dialog.service';
import { Dialoginfos } from '../../interfaces/dialoginfos';

@Component({
  selector: 'app-dialogcomp',
  templateUrl: './dialogcomp.component.html',
  styleUrl: './dialogcomp.component.scss'
})
export class DialogcompComponent {
  @Input('key') key: string = '';

  infoslocal?: Dialoginfos;
  exib: boolean = false;

  constructor(
    private dialogService: ShowDialogService
  ) {
    this.dialogService.show.subscribe((values: Dialoginfos) => {
      if(values.key == this.key) {
        this.show(values);
      }
    });
  }

  show(values: Dialoginfos) {
    this.infoslocal = values;
    this.exib = true;
  }

  close() {
    this.exib = false;
    this.dialogService.info.next({key: this.key, value: false});
  }

  confirm() {
    this.exib = false;
    this.dialogService.info.next({key: this.key, value: true});
  }
}
