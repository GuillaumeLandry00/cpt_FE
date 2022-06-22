import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IResponse } from "../../interface/interfaces";
import { ICompensation } from "../../interface/interface_accounting";
import { authToken } from "../agent/authentification";
import { capitalizeString } from "../agent/clients";

/**
 * This function will fetch all the purchases from the database
 */
export const getCompensationFunds = async (): Promise<unknown> => {
    try {
        //We make the request
        const response = await axios.get<ICompensation[]>(BASE_URL + "accounting/compensationFunds/", { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will fetch all the purchases from the database
 */
export const getCompensationFund = async (id: number): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<ICompensation[]>(BASE_URL + `accounting/compensationFunds/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will delete the selected purchases from the database
 */
export const deleteCompensationFunds = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `accounting/compensationFunds/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const updateCompensationFundss = async (data: ICompensation, id: number) => {
    try {
        const params = new URLSearchParams();
        params.append("date_au", String(data.date_au));
        params.append("date_du", String(data.date_du));
        params.append("succ", String(data.succ));
        params.append("devise", String(data.devise));
        params.append("ventes", String(data.ventes));
        params.append("opc", String(data.opc));
        params.append("frais", String(data.frais));
        params.append("solde", String(data.solde));


        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/compensationFunds/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const addCompensationFunds = async (data: ICompensation) => {
    try {

        console.log(data);

        const params = new URLSearchParams();
        params.append("date_au", String(data.date_au));
        params.append("date_du", String(data.date_du));
        params.append("succ", String(data.succ));
        params.append("devise", String(data.devise));
        params.append("ventes", String(data.ventes));
        params.append("opc", String(data.opc));
        params.append("frais", String(data.frais));
        params.append("solde", String(data.solde));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/compensationFunds/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const validateCompensation = (data: ICompensation): boolean => {


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
