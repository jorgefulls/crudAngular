import { IUsuario } from "./iusuario.interface";

export interface IRresponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: IUsuario[];
}
