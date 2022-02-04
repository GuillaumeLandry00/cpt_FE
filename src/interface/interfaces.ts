interface IResponse {
    code: number,
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
    data: Object[],
}

interface IReducerClientArray {
    client: any
}

interface IReducerClient {
    id: number
}

interface IActionReducer {
    type: string,
    payload?: number
}

export type { IResponse, IResponseAuth, IClient, IReducerClientArray, IActionReducer }