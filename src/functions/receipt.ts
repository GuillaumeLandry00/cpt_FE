import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IResponse, IUtilisateur } from "../interface/interfaces";

export const buildReceipt = (values: any, utilisateur: IUtilisateur) => {

    let receipt: any = { agent: utilisateur, facturation: {}, passagers: [], itinerary: {}, product: {}, opc: {}, summary: {}, others: {} };

    for (const [key, value] of Object.entries(values)) {

        //console.log(`${key}: ${value}`);
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
                if (!receipt.itinerary.hasOwnProperty("itinerary" + key.charAt(key.length - 1))) {
                    receipt.itinerary["itinerary" + key.charAt(key.length - 1)] = {};
                }
                receipt.itinerary["itinerary" + key.charAt(key.length - 1)][name] = value;
                break;
            case "T":
                if (!receipt.product.hasOwnProperty("product" + key.charAt(key.length - 1))) {
                    receipt.product["product" + key.charAt(key.length - 1)] = {};
                }
                receipt.product["product" + key.charAt(key.length - 1)][name] = value;
                break;
            case "O":
                receipt.opc[name] = value;
                break;
            case "S":
                if (!receipt.summary.hasOwnProperty("summary" + key.charAt(key.length - 1))) {
                    receipt.summary["summary" + key.charAt(key.length - 1)] = {};
                }
                receipt.summary["summary" + key.charAt(key.length - 1)][name] = value;
                break;
            default:
                receipt.others[key] = value;
                break;
        }
    }
    console.log(receipt);
    sendReceipt(receipt);
}


export const sendReceipt = async (receipt: any) => {
    const response: any = await axios.post(BASE_URL + "receipt/", receipt);
    console.log(response);
}

export const getReceipts = async (search: string = "", id: string = ""): Promise<any> => {
    try {
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let request: string = BASE_URL + `receipt/${utilisateur.nom}?search=${search}`;
        if (id) request += `&id=${id}`;
        console.log(request);
        const response: IResponse = await axios.get(request);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}