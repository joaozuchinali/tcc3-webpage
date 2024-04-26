export interface GetProjetoInfosDominio {
    idprojeto: number;
}


export interface ProjetoInfosDominio {
    dominio: string;
    pesquisas: number;
    tempo: string;
    usuarios: number;
    full?: boolean;
}
