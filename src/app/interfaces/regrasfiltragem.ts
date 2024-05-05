export interface Regrasfiltragem {
    label: string;
    indice: string;
    ordem: 1 | 2;
    key: string;
}

export interface ControleFiltragem {
    limite: string;
    indice: string;
    regras: Regrasfiltragem[];
    filtra: () => void;
    posFiltro: (vec: any[]) => void;
}