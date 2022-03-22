import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IResponse } from "../interface/interfaces";
import { authToken } from "./authentification";

export const getAllClient = async (limit = 25): Promise<any> => {
    try {
        //We check if user is registred in local storage
        let utilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let who: string = utilisateur.typeUtilisateur == 1 ? "all" : utilisateur.nom;
        const response: IResponse = await axios.get(BASE_URL + "client/" + who + `?limit=${limit}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getClient = async (id: string): Promise<any> => {

    try {
        const response: IResponse = await axios.get(BASE_URL + "client/view/" + id, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        });
        authToken(response.data);
        return await response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getClientSearch = async (search: string): Promise<any> => {
    try {
        //We check if user is registred in local storage
        let utilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let who: string = utilisateur.typeUtilisateur == 1 ? "all" : utilisateur.nom;

        //We make the request
        const response: IResponse = await axios.get(BASE_URL + `client/${who}?search=${search}`, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        })
        authToken(response.data);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}

export const deleteClient = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `client/delete/${id}`, {
            headers: { "x-access-token": localStorage.getItem('token') as string }
        })
        authToken(response.data);


        if (response.data.affectedRows > 0) {

        } else {

        }
        window.location.href = window.location.href += response.data.affectedRows > 0 ? "/?deleted=true" : "/?deleted=false";

    } catch (error: unknown) {
        console.log(error);
    }
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

    // Validate the address
    regExp = new RegExp(/^([#.0-9a-zA-Z\s,']-?)+$/, "i");
    console.log(client.adresse);
    if (!regExp.test(client.adresse)) {
        errors.push("address");
    }

    //validate the zip code
    regExp = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "i");
    if (!regExp.test(client.zip.trim())) {
        errors.push("zip_code");
    }

    // Validate phone number
    regExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "i");
    if (!regExp.test(client.phone1.trim())) {
        errors.push("telephone");
    }

    //validate the email
    regExp = new RegExp(/^\S+@\S+\.\S+$/, "i");
    if (!regExp.test(client.courriel.trim())) {
        errors.push("email");
    }

    return errors;
}

/**
 * This make the api request and update a client
 */
export const updateClient = async (client: any): Promise<any> => {
    try {

        //We create formData for the request
        const params: URLSearchParams = new URLSearchParams();
        params.append("genre", client.genre);
        params.append("nom", client.nom);
        params.append("prenom", client.prenom);
        params.append("naissance", client.naissance);
        params.append("adresse", client.adresse);
        params.append("ville", client.ville);
        params.append("province", client.province);
        params.append("zip", client.zip);
        params.append("phone1", client.phone1);
        params.append("courriel", client.courriel);
        params.append("langue", client.langue);
        params.append("note", client.note);
        params.append("ID", client.id);

        const response: any = await axios({
            method: "post",
            url: BASE_URL + "client/update",
            data: params,
            headers: { "Content-Type": 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This make the api request and add the client into the DB
 */
export const addClient = async (client: any): Promise<any> => {
    try {
        let utilisateur: any = JSON.parse(localStorage.getItem("utilisateur") as string);
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
        formData.append("agent", utilisateur.nom);
        formData.append("note", client.note);
        formData.append("passport_pdf", client.file);

        const response: any = await axios({
            method: "post",
            url: BASE_URL + "client/addclient",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param string, string to capitalize 
 * @returns 
 */
export const capitalizeString = (string: string): string => {
    string = string.toLowerCase();
    let arrString = string.split(" ");

    let capitalizedString = "";
    for (let i = 0; i < arrString.length; i++) {
        capitalizedString += arrString[i].charAt(0).toUpperCase() + arrString[i].slice(1) + " ";
    }

    return capitalizedString;
}   