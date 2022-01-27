import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IResponse } from "../interface/interfaces";

export const getAllClient = async (): Promise<any> => {
    try {
        //We check if a user is registred in local storage
        let utilisateur = JSON.parse(localStorage.getItem("utilisateur") || '{}');
        if (!utilisateur.nom) return;
        const response: IResponse = await axios.get(BASE_URL + "client/" + utilisateur.type_utilisateur === "1" ? "all" : utilisateur.nom);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getClient = async (id: string): Promise<any> => {
    try {
        const response: IResponse = await axios.get(BASE_URL + "client/view/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getClientSearch = async (search: string): Promise<any> => {
    try {
        const response: IResponse = await axios.get(BASE_URL + `client/?search=${search}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteClient = async () => {

}

export const validateClient = (client: any): string[] => {
    let errors: string[] = [];

    //Init of regex
    let regExp: RegExp;

    //we validate the name
    regExp = new RegExp("^([a-zA-ZÀ-ÿ.]-?)+$", "i");
    if (!regExp.test(client.nom.trim())) {
        errors.push("client_name");
    }
    if (!regExp.test(client.prenom.trim())) {
        errors.push("client_lastname");
    }
    if (!regExp.test(client.ville.trim())) {
        errors.push("city");
    }

    //Validate the address
    // regExp = new RegExp("^([#.0-9a-zA-Z\s,']-?)+$", "i");
    // console.log(client.adresse.trim());
    // if (!regExp.test(client.adresse.trim())) {
    //     errors.push("address");
    // }

    //validate the zip code
    // regExp = new RegExp("^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$", "i");
    // if (!regExp.test(client.zip.trim())) {
    //     errors.push("zip_code");
    // }

    //Validate phone number
    // regExp = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$", "i");
    // if (!regExp.test(client.phone1.trim())) {
    //     errors.push("telephone");
    // }

    //validate the email
    // regExp = new RegExp("^\S+@\S+\.\S+$", "i");
    // if (!regExp.test(client.courriel.trim())) {
    //     errors.push("email");
    // }

    return errors;
}

/**
 * This make the api request and add the client into the DB
 */
export const addClient = async (client: any): Promise<any> => {
    try {

        //We create formData for the request
        const formData: FormData = new FormData();
        formData.append("genre", client.genre);
        formData.append("nom", client.nom);
        formData.append("prenom", client.prenom);
        formData.append("naissance", client.naissance);
        formData.append("adresse", client.adresse);
        formData.append("ville", client.ville);
        formData.append("province", client.province);
        formData.append("zip", client.zip);
        formData.append("phone1", client.phone1);
        formData.append("courriel", client.courriel);
        formData.append("langue", client.langue);
        formData.append("note", client.note);
        formData.append("passport_pdf", client.file);

        const response: any = await axios({
            method: "post",
            url: BASE_URL + "client/addclient",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}