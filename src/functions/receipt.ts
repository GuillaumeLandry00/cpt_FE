import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IGenericObject, IResponse, IUtilisateur } from "../interface/interfaces";
import { authToken } from "./authentification";

export const buildReceipt = async (values: any, utilisateur: IUtilisateur, action: string, id: string = "") => {
    console.log(values);


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

    //we check if the receipt is valid
    if (!validateReceipt(receipt)) {
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
    } else {
        alert("Veuillez avoir au minimum rempli la date, le numéro de dossier, la date de départ et au moins un passager.")
    }


}

export const getReceipts = async (order: string, by: string, search: string = "", id: string = ""): Promise<any> => {
    try {
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let request: string = `${BASE_URL}receipt/${utilisateur.nom}?search=${search}`;
        request += `&order=${order}`;
        request += `&by=${by}`
        if (id) request += `&id=${id}`;
        console.log(request);

        const response: IResponse = await axios.get(request, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });
        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}

export const getReceipt = async (id: string): Promise<any> => {
    try {

        let request: string = `${BASE_URL}receipt/view/${id}`;
        const response: IResponse = await axios.get(request, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });

        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}

const validateReceipt = (receipt: IGenericObject) => {

    let err = false;

    if (receipt.facturation.date == "") err = true;
    if (receipt.facturation.no_dossier == "") err = true;
    if (receipt.itinerary[0].date_depart == "") err = true;
    if (receipt.passagers.length <= 0) err = true;
    console.log(receipt.facturation.no_dossier, err);

    return err;
}