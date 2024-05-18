export interface ProjetoInfosDominio {
    dominio: string;
    pesquisas: number;
    tempo: string;
    usuarios: number;
    full?: boolean;
    favicon?: string;
}

export interface ProjetoInfosTopoDominio {
    topo: string;
    pesquisas: number;
    full?: boolean;
}

export interface ProjetosDia {
    diap: string;
    pesquisas: string | number;
}

export interface ProjetosDiaLs {
    data: string;
    pesquisas: string;
    dia: string;
}