export interface IPurchases {
    id: number,
    fournisseur: string,
    description: string,
    succ: number,
    devise: string,
    date: string,
    facture: number
    date_due: string,
    montant: number,
    solde: number
}

export interface IPurchasingIssues {
    id: number,
    cheque: string,
    succ: number,
    banque: string,
    date: string,
    fournisseur: string,
    payer_a: string,
    etat: string,
    type: string,
    montant: string,
    date_echeance: string
}

export interface ICompensation {
    id: number,
    date_du: string,
    date_au: string,
    succ: string,
    devise: string,
    ventes: number,
    opc: number,
    frais: number,
    solde: number
}

export interface ITaxes {
    id: number,
    date_du: string,
    date_au: string,
    date_paiement: string,
    type: string,
    cheque: string,
    ecriture: string,
    montant: string
}