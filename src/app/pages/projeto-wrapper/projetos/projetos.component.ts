import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AddProjetoService } from '../../../utils/add-projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent implements OnInit{
  adicionandoProjeto: boolean = false;
  redirecionado: boolean = false;
  idequipe: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projetos: AddProjetoService
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      if(data['idequipe']) {
        this.redirecionado = true;
        this.idequipe = data['idequipe']
      }
    });

    this.addProjetos();
  }

  addProjetos() {
    const subs = this.projetos.addProjeto.subscribe((value) => {
      this.adicionandoProjeto = true;
    });
  }

  cancelarProjeto() {
    this.adicionandoProjeto = false;
  }
}
