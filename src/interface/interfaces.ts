import { Dispatch, SetStateAction } from "react";

interface IResponse {
    code?: number,
}

interface IResponseAuth extends IResponse {
    message: string,
    //  utilisateur: IUtilisateur,
    token: string,
}

interface IClient {
    ID: number,
    Gender: string,
    Nom: string,
    Prenom: string,
    Naissance: string,
    Adresse: string,
    Ville: string,
    Province: string,
    Zip: string,
    Phone1: string,
    Phone2: string,
    Phone3: string,
    Ext: string,
    Fax: string,
    Courriel: string,
    Langue: string,
    Passport: string,
    P_date: string,
    Agent: string,
    Note: string,
}

interface IResponse {
    data: any,
    headers: IGenericObject
}

interface IReducerClientArray {
    client: any
}


interface IUtilisateur {
    email: string,
    nom: string,
    nomComplet: string,
    typeUtilisateur: number,
    user_type: number,
    agences: string,
    last_login: string,
    comm: number,
    id?: string
}



interface IReceipt {
    date: string,
    facturationID: string,
    dossier_no: string,
    nom: string,
    data?: IGenericObject
    courriel: string

}

interface IFacture {
    id: number,
    dossier: number,
    date: string,
    nomComplet: string,
    NOM: string,
    general: string
}

type IFactureDB = {
    agence: string
    date: string
    dossier: number
    general: string
    itinerary: string
    paiements: string
    passagers: string
    products: string
    remarks: string
}


interface ISingleProps {
    data: Array<any> | any,
    opcAmount?: number,
    grandTotal?: number,

    setOpcAmount?: Dispatch<SetStateAction<number>>,
    setGrandTotal?: Dispatch<SetStateAction<number>>
}

interface IGenericObject {
    [key: string]: any
}

interface ISelect {
    value: string | number,
    label: string
}

interface IReceiptErrors {
    passagers: Array<String>
    itinerary: Array<String>
    products: Array<String>
    summaryOpc: Array<String>
    paiements: Array<String>
    general: Array<String>
    others: Array<String>
}


export type { IResponse, IResponseAuth, IClient, IReducerClientArray, IUtilisateur, IReceipt, IGenericObject, ISingleProps, ISelect, IFacture, IFactureDB, IReceiptErrors }