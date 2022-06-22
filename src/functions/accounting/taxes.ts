import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IGenericObject, IResponse, IUtilisateur } from "../../interface/interfaces";
import { ITaxes } from "../../interface/interface_accounting";
import { authToken } from "../agent/authentification";
import { capitalizeString } from "../agent/clients";

/**
 * This function will fetch all the Taxes from the database
 */
export const getTaxes = async (): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<ITaxes[]>(BASE_URL + "accounting/taxes/", { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will fetch all the Taxes from the database
 */
export const getTaxe = async (id: number): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<ITaxes[]>(BASE_URL + `accounting/taxes/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will delete the selected Taxes from the database
 */
export const deleteTaxes = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `accounting/taxes/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const updateTaxes = async (data: ITaxes, id: number) => {
    try {
        const params = new URLSearchParams();
        params.append("date_au", String(data.date_au));
        params.append("date_du", String(data.date_du));
        params.append("date_paiement", String(data.date_paiement));
        params.append("type", String(data.type));
        params.append("cheque", String(data.cheque));
        params.append("ecriture", String(data.ecriture));
        params.append("montant", String(data.montant));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/taxes/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const addTaxes = async (data: ITaxes) => {
    try {
        const params = new URLSearchParams();
        params.append("date_au", String(data.date_au));
        params.append("date_du", String(data.date_du));
        params.append("date_paiement", String(data.date_paiement));
        params.append("type", String(data.type));
        params.append("cheque", String(data.cheque));
        params.append("ecriture", String(data.ecriture));
        params.append("montant", String(data.montant));
        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/taxes/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const validateTaxes = (data: ITaxes): boolean => {


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
