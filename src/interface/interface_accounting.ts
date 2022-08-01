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

export interface IExpensesForm {
    succ: string,
    date_du: string,
    suppliers: string,
    currency: string
}

export interface IReceiptDB {
    id: number,
    dossier: number,
    date: string,
    fk_id_agent: string,
    agence: string,
    passagers: string,
    itinerary: string,
    products: string,
    remarks: string,
    paiements: string,
    general: string,
    comm: number
}

export interface IOpc {
    opc: number,
    grand_total: number,
    opc_notes: string,
    opc_remarque1: string,
    opc_remarque_2: string
}

export interface IGeneral {
    courriel: string,
    tot_paiement: string,
    balance: string,
    general_date: string,
    assurance: string,
    signature: string,
    notes_final: string
}

export interface IPaiements {
    paiement_date: string,
    total_paiements: number,
    numero_carte: string,
    mode: string,
    detenteur: string,
    cvv: string,
    exp: string
}

export interface IProducts {
    type_produit: string,
    produit_note: string,
    produit_tvq: number,
    produit_tps: number,
    escompte: number,
    total: number,
    taxe: number,
    prix: number,
    qty: number
}

export interface Iitinerary {
    origin: string,
    destination: string,
    cie: string,
    vol_no: string,
    classe: string,
    date_depart: string,
    depart_hh: number,
    depart_mm: number,
    arrive: string,
    arrive_hh: number,
    arrive_mm: number,
    itineraire_note: string
}