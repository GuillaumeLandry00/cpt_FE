import axios from "axios"
import { BASE_URL } from "../../constants/constantes"
import { IGenericObject, IReceiptErrors, IResponse, IUtilisateur } from "../../interface/interfaces";
import { authToken } from "./authentification";

export const buildReceipt = (values: any, utilisateur: IUtilisateur, action: string, id: string = "") => {

    let receipt: any = { agent: utilisateur, facturation: {}, passagers: [], itinerary: [], product: [], opc: {}, summary: [], others: {} };

    for (const [key, value] of Object.entries(values)) {

        let name = key;
        name = name.substring(1, key.length - 2);
        switch (key.charAt(0)) {
            case "F":
                receipt.facturation[key.substring(1, key.length)] = value;
                break;
            case "C":
                if (value !== "") {
                    receipt.passagers.push(value)
                }
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

                //Default
                receipt.product[key.charAt(key.length - 1)]["type_comm"] = "%";
                receipt.product[key.charAt(key.length - 1)]["comm"] = utilisateur.comm;
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

    return receipt;
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

export const getReceipts = async (order: string, by: string, search: string = "", limit = 50): Promise<any> => {
    try {
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let request: string = `${BASE_URL}receipt/${utilisateur.id}?search=${search}`;

        request += `&order=${order}`;
        request += `&by=${by}`
        request += `&limit=${limit}`


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

export const deleteReceipt = async (id: number) => {
    try {
        const response: IResponse = await axios.delete(`${BASE_URL}receipt/${id}`, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });

        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);

    }
}

export const duplicateReceipt = async (id: number) => {
    try {
        const response: IResponse = await axios.get(`${BASE_URL}receipt/duplicate/${id}`, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });

        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);

    }
}

export const validateReceipt = (receipt: IGenericObject) => {
    let generic_errors = verifacationReceipt(receipt);
    if (receipt.facturation.date == "") generic_errors.others.push("Date invalide");
    if (receipt.facturation.no_dossier == "") generic_errors.others.push("Le numéro de dossier n'est pas valide ");;
    if (receipt.itinerary[0].date_depart == "") generic_errors.others.push("Date invalide");;
    if (receipt.passagers.length <= 0) generic_errors.others.push("Vous devez avoir au minimum un passager");

    return generic_errors;
}

const verifacationReceipt = (receipt: IGenericObject) => {
    let errors: IReceiptErrors = {
        passagers: [],
        itinerary: [],
        products: [],
        summaryOpc: [],
        paiements: [],
        general: [],
        others: []
    };

    //First of, we check the passagers
    receipt.passagers.map((passager: String, i: number) => {
        if (passager == "") errors.passagers.push(`Erreur avec le client ${i + 1}`);
    })

    //We check the itinerary
    receipt.itinerary.map((iti: IGenericObject) => {
        if (!(iti.depart_hh < 24 && iti.depart_hh > 0) && !(iti.depart_mm < 60 && iti.depart_mm > 0)) {
            errors.passagers.push(`L'heure de départ doit être valide`);
        }


        if (!(iti.arrive_hh < 24 && iti.arrive_hh > 0) && !(iti.arrive_mm < 60 && iti.arrive_mm > 0)) {
            errors.passagers.push(`L'heure d'arrivée doit être valide`);
        }

        let dateDepart = new Date(iti.date_depart)
        let dateArrive = new Date(iti.arrive)
        if (dateArrive.getTime() - dateDepart.getTime() < 0) {
            errors.passagers.push(`La date d'arrivée ne peut pas être avant la date de départ`);
        }
    })


    receipt.product.map((item: IGenericObject, index: number) => {
        if (item.qty < 0 || item.qty == "") {
            errors.products.push(`Produit(${index + 1}) la quantité ne peut pas être inférieur à 0`)
        }
        if (item.prix == "" || item.prix < 0) {
            errors.products.push(`Produit(${index + 1}) le prix ne peut pas être inférieur à zéro`)
        }
        if (item.produit_tps == "" || item.produit_tps < 0) {
            errors.products.push(`Produit(${index + 1}) la tps ne peut pas être inférieur à zéro`)
        }
        if (item.produit_tvq == "" || item.produit_tvq < 0) {
            errors.products.push(`Produit(${index + 1}) la tvq ne peut pas être inférieur à zéro`)
        }
        if (item.escompte == "" || item.escompte < 0 || item.total == "") {
            errors.products.push(`Produit(${index + 1}) l'escompte ne peut pas être inférieur à zéro`)
        }

        if (item.total == "" || item.total < 0) {
            errors.products.push(`Produit(${index + 1}) le total ne peut pas être inférieur à zéro`)
        }

        if (item.produit_dossier == "") {
            errors.products.push(`Produit(${index + 1}) le numéro de dossier ne peut pas être vide`)
        }
    })

    return errors;



}

