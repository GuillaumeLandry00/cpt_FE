import axios from "axios";
import { Exception } from "sass";
import { BASE_URL } from "../../constants/constantes";
import { IGenericObject, IResponse, IUtilisateur } from "../../interface/interfaces";
import { IExpensesForm, IPurchases } from "../../interface/interface_accounting";
import { authToken } from "../agent/authentification";

/**
 * This function will fetch all the purchases from the database
 */
export const getPurchases = async (search = "", limit = 25, offset = 0): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<IPurchases[]>(BASE_URL + `accounting/purchases?search=${search}&limit=${limit}&offset=${offset}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will fetch all the purchases from the database
 */
export const getPurchase = async (id: number): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<IPurchases[]>(BASE_URL + `accounting/purchases/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will delete the selected purchases from the database
 */
export const deletePurchase = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `accounting/purchases/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const updatePurchases = async (data: IPurchases, id: number) => {
    try {
        const params = new URLSearchParams();
        params.append("fournisseur", String(data.fournisseur));
        params.append("description", String(data.description));
        params.append("succ", String(data.succ));
        params.append("devise", String(data.devise));
        params.append("date", String(data.date));
        params.append("facture", String(data.facture));
        params.append("date_due", String(data.date_due));
        params.append("montant", String(data.montant));
        params.append("solde", String(data.solde));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/purchases/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const addPurchases = async (data: IPurchases) => {
    try {
        const params = new URLSearchParams();
        params.append("fournisseur", String(data.fournisseur));
        params.append("description", String(data.description));
        params.append("succ", String(data.succ));
        params.append("devise", String(data.devise));
        params.append("date", String(data.date));
        params.append("facture", String(data.facture));
        params.append("date_due", String(data.date_due));
        params.append("montant", String(data.montant));
        params.append("solde", String(data.solde));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `accounting/purchases/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.error(error);
    }
}

export const generateExpenses = async (values: IExpensesForm, pdf = false, travel = false) => {
    try {
        const params = new URLSearchParams();
        params.append("succ", String(values.succ));
        params.append("date_du", String(values.date_du));
        params.append("suppliers", String(values.suppliers));
        params.append("currency", String(values.currency));

        let url: string = ""
        if (!pdf) {
            url = BASE_URL + `accounting/expenses/${travel ? "travel/" : ""}`
        } else {
            url = BASE_URL + `accounting/expenses/${travel ? "travel/" : ""}/pdf/`
        }


        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: url,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });

        authToken(response.data);

        return response.data
    } catch (error: unknown) {
        console.error(error);
    }

}