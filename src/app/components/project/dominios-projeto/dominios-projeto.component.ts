import { Component, OnInit } from '@angular/core';
import { ConversorService } from '../../../utils/conversor.service';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';
import { DialogCentralService } from '../../../utils/dialog-central.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../utils/api-urls.service';
import { ProjetoInfosDominio } from '../../../interfaces/api/get-projeto-infos-dominio';
import { HttpRetorno } from '../../../interfaces/api/http-retorno';
import { GetInfosByIdprojeto } from '../../../interfaces/api/get-infos-by-idprojeto';

@Component({
  selector: 'app-dominios-projeto',
  templateUrl: './dominios-projeto.component.html',
  styleUrl: './dominios-projeto.component.scss'
})
export class DominiosProjetoComponent implements OnInit {

  dialogKey: string = 'di-projeto-atual';

  dominiosList: ProjetoInfosDominio[] = [];
  limite: string = '';
  ordencao: string = '';
  
  constructor(
    public conversor: ConversorService,
    private currentProject: CurrentProjetoService,
    private dialogService: DialogCentralService,
    private http: HttpClient,
    private apiUrls: ApiUrlsService
  ) {

  }

  ngOnInit(): void {
    this.getDominios();
  }

  getDominios() {
    const projeto = this.currentProject.get();
    
    const query: GetInfosByIdprojeto = {
      idprojeto: projeto.idprojeto
    }

    this.http.post<HttpRetorno>(this.apiUrls.apiUrl + this.apiUrls.projetoDominios, query)
    .subscribe({
      next: (value) => {
        if(value.data && value.data instanceof Object) {
          const infos = (<ProjetoInfosDominio[]>value.data).map(e => {e.full = false; return e;});
          this.dominiosList = infos;
        }
      },
      error: (err) => {
        console.log(err);

        if(err.error.status && err.error.status == 'error') {
          this.dialogService.config({
            key: this.dialogKey, 
            text: 'Não foi possível carregar os dados dos domínios.', 
            title: 'Dados não encontrados',
            type: 'message'
          });
        }
      }
    });
  }

  changeCard(item: ProjetoInfosDominio) {
    item.full = !item.full;
  }
}
