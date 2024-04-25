import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentProjetoService } from '../../../utils/current-projeto.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {
  identificador: string = '';
  dialogKey: string = 'di-projeto-atual';
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentProjeto: CurrentProjetoService
  ) { }

  ngOnInit(): void {
    this.setId();
  }

  // Captura o id
  private setId(): void {
    this.identificador = this.route.snapshot.params['identificador'];  
    this.route.params.subscribe((data) => {
      this.identificador = data['identificador'];
      console.log(this.identificador);
    });
  }
}
