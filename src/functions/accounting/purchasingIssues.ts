import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IResponse, IUtilisateur } from "../../interface/interfaces";
import { IPurchases, IPurchasingIssues } from "../../interface/interface_accounting";
import { authToken } from "../agent/authentification";
import { capitalizeString } from "../agent/clients";

/**
 * This function will fetch all the purchases from the database
 */
export const getPurchasingIssues = async (search = "", limit = 25, offset = 0): Promise<unknown> => {
    try {
        //We make the request
        const response = await axios.get<IPurchasingIssues[]>(BASE_URL + `accounting/purchasingIssues?search=${search}&limit=${limit}&offset=${offset}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will fetch all the purchases from the database
 */
export const getPurchasingIssue = async (id: number): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<IPurchasingIssues[]>(BASE_URL + `accounting/purchasingIssues/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will delete the selected purchases from the database
 */
export const deletePurchasingIssues = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `accounting/purchasingIssues/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const updatePurchasingIssues = async (data: IPurchasingIssues, id: number) => {
    try {
        const params = new URLSearchParams();
        params.append("cheque", String(data.cheque));
        params.append("succ", String(data.succ));
        params.append("banque", String(data.banque));
        params.append("date", String(data.date));
        params.append("fournisseur", String(data.fournisseur));
        params.append("payer_a", String(data.payer_a));
        params.append("etat", String(data.etat));
        params.append("type", String(data.type));
        params.append("montant", String(data.montant));
        params.append("date_echeance", String(data.date_echeance));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/purchasingIssues/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const addPurchasingIssues = async (data: IPurchasingIssues) => {
    try {

        const params = new URLSearchParams();
        params.append("cheque", String(data.cheque));
        params.append("succ", String(data.succ));
        params.append("banque", String(data.banque));
        params.append("date", String(data.date));
        params.append("fournisseur", String(data.fournisseur));
        params.append("payer_a", String(data.payer_a));
        params.append("etat", String(data.etat));
        params.append("type", String(data.type));
        params.append("montant", String(data.montant));
        params.append("date_echeance", String(data.date_echeance));


        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/purchasingIssues/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const validatePurchase = (data: IPurchasingIssues | IPurchases): boolean => {


    let errors: Array<string> = new Array<string>();
    for (let property in data) {
        if (!(String(data[property as keyof typeof data]).trim().length > 0)) {
            errors.push(property);
        }
    }

    if (errors.length > 0) {
        let msg = "Vous avez une erreur pour les champs: \n";
        for (let i = 0; i < errors.length; i++) {
            msg += `  - ${capitalizeString(errors[i].replace("_", " "))}\n`
        }
        msg += "Vous devez au moins remplir les champs d'un charactère"

        alert(msg)
        return false
    } else {
        return true;
    }

}
