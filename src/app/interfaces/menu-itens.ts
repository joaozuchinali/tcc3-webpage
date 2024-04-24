import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export interface MenuItens {
    nome: string;
    page: string;
    isfocus: boolean;
    icon: [IconPrefix, IconName];
    current?: boolean;
}
