interface IResponse {
    code: number,
}

interface IResponseAuth extends IResponse {
    message: string,
    //  utilisateur: IUtilisateur,
    token: string,
}

// interface IUtilisateur {
//     email: string,
//     token: string
// }


export type { IResponse, IResponseAuth }