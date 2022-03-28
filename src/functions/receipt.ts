import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IGenericObject, IResponse, IUtilisateur } from "../interface/interfaces";
import download from 'downloadjs'
import { authToken } from "./authentification";

export const buildReceipt = async (values: any, utilisateur: IUtilisateur, action: string, id: string = "") => {

    let receipt: any = { agent: utilisateur, facturation: {}, passagers: [], itinerary: [], product: [], opc: {}, summary: [], others: {} };

    for (const [key, value] of Object.entries(values)) {

        let name = key;
        name = name.substring(1, key.length - 2);

        switch (key.charAt(0)) {
            case "F":
                receipt.facturation[key.substring(1, key.length)] = value;
                break;
            case "C":
                receipt.passagers.push(value)
                break;
            case "I":
                if (receipt.itinerary.length <= key.charAt(key.length - 1)) {
                    receipt.itinerary.push({});
                }
                receipt.itinerary[key.charAt(key.length - 1)][name] = value;
                break;
            case "T":
                if (receipt.product.length <= key.charAt(key.length - 1)) {
                    receipt.product.push({});
                }
                receipt.product[key.charAt(key.length - 1)][name] = value;
                break;
            case "O":
                receipt.opc[key.substring(1, key.length)] = value;
                break;
            case "S":
                if (receipt.summary.length <= key.charAt(key.length - 1)) {
                    receipt.summary.push({});
                }
                receipt.summary[key.charAt(key.length - 1)][name] = value;
                break;
            default:
                receipt.others[key] = value;
                break;
        }
    }

    //we add an ID if we update 
    if (id) receipt.id = id;
    return await sendReceipt(receipt, action);
}


export const sendReceipt = async (receipt: IGenericObject, action: string) => {
    let response: IGenericObject;

    if (action == "add") {
        response = await axios({
            method: "post",
            url: BASE_URL + "receipt/",
            data: receipt,
            headers: { "x-access-token": localStorage.getItem('token') as string },
        });

    } else {
        response = await axios({
            method: "patch",
            url: BASE_URL + "receipt/",
            data: receipt,
            headers: { "x-access-token": localStorage.getItem('token') as string },
        });
    }
    authToken(response.data);
    return response.data;
}

export const getReceipts = async (search: string = "", id: string = ""): Promise<any> => {
    try {
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let request: string = `${BASE_URL}receipt/${utilisateur.nom}?search=${search}`;
        if (id) request += `&id=${id}`;

        const response: IResponse = await axios.get(request, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });
        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}

export const downloadReceipt = async (id: number): Promise<void> => {
    try {
        const response: IResponse = await axios.get(`${BASE_URL}receipt/generate/${id}`, {
            responseType: 'blob', // had to add this one here
        });


    } catch (error) {
        console.log(error);

    }
    return;
}