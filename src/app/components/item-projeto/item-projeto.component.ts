import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../interfaces/projeto';
import { CurrentProjetoService } from '../../utils/current-projeto.service';
import { DialogCentralService } from '../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../utils/api-urls.service';
import { ProjetoUpdate } from '../../interfaces/api/projeto-update';
import { HttpRetorno } from '../../interfaces/api/http-retorno';
import { ListProjetosService } from '../../utils/list-projetos.service';
import { ProjetoDelete } from '../../interfaces/api/projeto-delete';

@Component({
  selector: 'app-item-projeto',
  templateUrl: './item-projeto.component.html',
  styleUrl: './item-projeto.component.scss'
})
export class ItemProjetoComponent implements OnInit{
  @Input('projeto') projeto: Projeto = {codigo: -1, identificador: '', idequipe: -1, idprojeto: -1, idstatus: -1, nome: ''}

  copyTags = {
    1: 'identificador',
    2: 'codigo'
  };
  copyValues = {
    [this.copyTags[1]]: false,
    [this.copyTags[2]]: false
  };
  timeCopy: {
    [x: string]: any
  } = {
    [this.copyTags[1]]: null,
    [this.copyTags[2]]: null
  };

  editProjeto: boolean = false;
  focus: boolean = false;

  nome: string = '';
  codigoAcesso: string = '';
  dialogKey = 'di-projetos';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentProjeto: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private listProjeto: ListProjetosService,
    private apiUrls: ApiUrlsService
  ) {

  }

  ngOnInit(): void {
    this.nome = this.projeto.nome;
    this.codigoAcesso = String(this.projeto.codigo);
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

  // Validações e confirmações para update do projeto
  atualzarconfirm(): void {
    if(this.codigoAcesso.trim() == '' || this.nome.trim() == '') {
      this.dialogService.config({
        key: this.dialogKey, 
        text: 'Prencha todos os campos antes de atualizar o projeto?', 
        title: 'Campos vazios',
        type: 'message'
      });
      return;
    }

    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja atualizar o projeto?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.atualizar() });
  }
  atualizar(): void {
    const query: ProjetoUpdate = {
      nome: this.nome,
      codigo: Number(this.codigoAcesso),
      idprojeto: this.projeto.idprojeto
    };

    this.http.put<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.updateProjeto, query)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Object) {
          this.listProjeto.list.next(true);
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Falha ao atualizar o projeto!', 
            title: 'Erro',
            type: 'message'
          });
        }
      }
    });
  }

  // Validações e confirmações para delete
  deletarconfirm(): void {
    this.dialogService.config({
      key: this.dialogKey, 
      text: 'Deseja inativar o projeto?', 
      title: 'Confirmar',
      type: 'crud'
    }, () => { this.deletar() });
  }
  deletar() {
    const query: ProjetoDelete = {
      idprojeto: this.projeto.idprojeto
    }

    this.http.put<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.deleteProjeto, query)
    .subscribe({
      next: (value) => {
        console.log(value);
        if(value.data && value.status == 'success' && value.data instanceof Object) {
          this.listProjeto.list.next(true);
        }
      },
      error: (err) => {
        console.log(err);
        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Falha ao deletar o projeto!', 
            title: 'Erro',
            type: 'message'
          });
        }
      }
    });
  }

  copiarValor(valor: string | number, key: string) {
    let copyValue = String(valor);

    navigator.clipboard.writeText(copyValue).catch(() => {
      console.error("Unable to copy text");
    });

    if(this.timeCopy[key]) {
      clearTimeout(this.timeCopy[key]);
    }
    this.timeCopy[key] = setTimeout(() => {
      this.copyValues[key] = false
    }, 2000);
    this.copyValues[key] = true;
  }
}