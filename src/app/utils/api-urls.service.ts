import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  readonly apiUrl: string = 'http://localhost:12005/api/';
  
  readonly createUser: string = 'usuarios/create/';
  readonly getUsuario: string = 'usuarios/get/';
  readonly getUsuarioMail: string = 'usuarios/getmail/';
  readonly getUsuariosEquipe: string = 'usuarios/getequipe/';
  readonly deleteUsuario: string = 'usuarios/inativar/';
  readonly updateUsuario: string = 'usuarios/update/';
  
  readonly getEquipes: string = 'equipes/getall/';
  readonly createEquipe: string = 'equipes/create/';
  readonly deleteEquipe: string = 'equipes/inativar/'

  readonly createEquipeUso: string = 'equipeuso/create/';
  readonly deleteEquipeUso: string = 'equipeuso/delete';

  readonly createProjeto: string = 'projetos/create/';
  readonly getProjetosUsuario: string = 'projetos/getalluser/';
  readonly getProjetosEquipe: string = 'projetos/getall/';
  readonly updateProjeto: string = 'projetos/update/';
  readonly deleteProjeto: string = 'projetos/inativar/';

  readonly projetoVisaoGeral: string = 'registros/visaogeral/';
  readonly projetoDominios: string = 'registros/infosdominio/';

  constructor(
  
  ) { }
}
