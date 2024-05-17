import { Component, Input } from '@angular/core';
import { Loadinginfos } from '../../interfaces/loadinginfos';
import { ShowLoadingService } from '../../utils/show-loading.service';

@Component({
  selector: 'app-loadingcomp',
  templateUrl: './loadingcomp.component.html',
  styleUrl: './loadingcomp.component.scss'
})
export class LoadingcompComponent {
  @Input('key') key: string = '';

  infoslocal?: Loadinginfos;
  exib: boolean = false;

  constructor(
    private showLoadingService: ShowLoadingService
  ) {
    
  }

  ngOnInit(): void {
    this.showLoadingService.show.subscribe((values: Loadinginfos) => {
      if(values.key == this.key) {
        this.show();
      }
    });

    this.showLoadingService.hide.subscribe((values: Loadinginfos) => {
      if(values.key == this.key) {
        this.close();
      }
    });
  }

  show() {
    this.exib = true;
  }


  close() {
    this.exib = false;
  }
}
