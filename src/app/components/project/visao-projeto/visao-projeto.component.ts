import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { ProjetoVisaoGeral } from '../../../interfaces/api/get-projeto-visao-geral';
import { ConversorService } from '../../../utils/conversor.service';
import { GetInfosByIdprojeto } from '../../../interfaces/api/get-infos-by-idprojeto';
import { timer } from 'rxjs';

@Component({
  selector: 'app-visao-projeto',
  templateUrl: './visao-projeto.component.html',
  styleUrl: './visao-projeto.component.scss'
})
export class VisaoProjetoComponent implements OnInit, OnDestroy {

  
  dialogKey: string = 'di-projeto-atual';

  visaoGeral: ProjetoVisaoGeral = {
    dominios_count: 0, 
    equipe_nome: '', 
    uso_pesquisados: 0, 
    registros_count: 0,
    status_nome: '',
    time_navegacao: '0'
  };
  timerVisao: any;

  constructor(
    private currentProject: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService,
    public conversor: ConversorService
  ) {

  }

  ngOnInit(): void {
    this.getVisaoGeral();
    this.timerSet();
  }

  private getVisaoGeral() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoVisaoGeral, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Object) {
          const infos = <ProjetoVisaoGeral>value.data;
          this.visaoGeral = infos;
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar os dados do projeto.', 
            title: 'Usuário não encontrado',
            type: 'message'
          });
        }
      }
    });
  }

  timerSet() {
    this.timerVisao = timer(20000, 20000).subscribe(() => {
      this.getVisaoGeral();
    });
  }

  ngOnDestroy(): void {
    this.timerVisao.unsubscribe();
  }
}
