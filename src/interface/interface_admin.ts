export interface ISupplier {
    id: number,
    type: string,
    code: string,
    nom: string,
    devise: string,
    gl_achat: number,
    adresse: string,
    agent: 0 | 1,
    inactif: 0 | 1
}