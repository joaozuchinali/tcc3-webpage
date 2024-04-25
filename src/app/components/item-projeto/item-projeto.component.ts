import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../interfaces/projeto';
import { CurrentProjetoService } from '../../utils/current-projeto.service';

@Component({
  selector: 'app-item-projeto',
  templateUrl: './item-projeto.component.html',
  styleUrl: './item-projeto.component.scss'
})
export class ItemProjetoComponent {
  @Input('projeto') projeto: Projeto = {codigo: -1, identificador: '', idequipe: -1, idprojeto: -1, idstatus: -1, nome: ''}

  editProjeto: boolean = false;
  focus: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentProjeto: CurrentProjetoService
  ) {

  }

  edit() {
    this.editProjeto = !this.editProjeto;
  }

  changeFocus(val: boolean) {
    this.focus = val
  }

  verProjeto() {
    this.currentProjeto.set(this.projeto);
    this.router.navigate([String(this.projeto.identificador)], { relativeTo: this.route });
  }
}
