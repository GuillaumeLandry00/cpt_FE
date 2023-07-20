import axios from "axios"
import { BASE_URL, SITE_URL } from "../../constants/constantes";
import { IGenericObject, IResponse, IUtilisateur } from "../../interface/interfaces";
import { authToken, checkToken } from "./authentification";
import { Buffer } from "buffer";

const d = new Date();

export const getAllClient = async (limit = 25, offset = 0): Promise<any> => {
    try {
        checkToken();
        //We check if user is registred in local storage
        let utilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
        let who: string = utilisateur.nom;

        const response: IResponse = await axios.get(BASE_URL + "client/" + who + `?limit=${limit}&offset=${offset}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getClient = async (id: string | number): Promise<any> => {

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


        window.location.href = `${SITE_URL}dashboard/client` + (response.data.affectedRows > 0 ? "/?deleted=true" : "/?deleted=false");

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
    if (client.naissance == "") {
        errors.push("birthdate");
    }

    // Validate the address
    regExp = new RegExp(/^([#.0-9a-zA-ZÀ-ÿ\s,']-?)+$/, "i");

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
        formData.append("note", client.note ? client.note : "");
        formData.append("passport_pdf", client.file);
        formData.append("link_pdf", client.file ? (d.getFullYear() + "_" + d.getMonth() + "_" + d.getDay() + "_" + client.file.name) : "No passport")
        formData.append("ID", client.id);

        const response: any = await axios({
            method: "post",
            url: BASE_URL + "client/update",
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
 * This make the api request and add the client into the DB
 */
export const addClient = async (client: any, clients_array = [{}]): Promise<any> => {
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
        formData.append("note", client.note ? client.note : "");
        formData.append("passport_pdf", client.file);
        formData.append("link_pdf", client.file ? (d.getFullYear() + "_" + d.getMonth() + "_" + d.getDay() + "_" + client.file.name) : "No passport")
        formData.append("extra_passenger", JSON.stringify(clients_array));


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
 * This function will 
 * @param mixedData,  
 * @returns array, with the values assembled
 */
export const buildClientArray = (mixedData: IGenericObject) => {

    //First off, we initialize the array with default values.
    let arrClients = new Array<any>((Object.keys(mixedData).length - 1) / 6);
    for (let i = 0; i < arrClients.length; i++) { arrClients[i] = { genre: "", nom: "", prenom: "", naissance: "", phone1: "", courriel: "" }; }

    for (const [key, value] of Object.entries(mixedData)) {
        if (key !== "notes") arrClients[parseInt(key.charAt(0)) - 1][key.substring(2)] = value;
    }

    return arrClients;

}

/**
 *This function will capitalize name that we send in parameter 
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


/**
 * This function will calculate the number of client added through the request
 */
export const calcAddedClients = (responses: IGenericObject): number => {
    let compteur = 0;

    responses.map((response: IGenericObject) => {
        if (response.affectedRows > 0) {
            compteur++;
        }
    });

    return compteur;
}

/**
 * This function will download the passport of the client
 * @param password, string 
 */
export const downloadPassport = async (password: string, link: string): Promise<string> => {

    let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)

    if (password !== "" && link && utilisateur.id) {

        let encrypted_password = Buffer.from(password).toString('base64');

        const params: URLSearchParams = new URLSearchParams();
        params.append("password", encrypted_password);
        params.append("link", link);
        params.append("id", utilisateur.id);


        const response: any = await axios({
            method: "post",
            url: BASE_URL + `client/download/passport`,
            data: params,
        });

        if (response.data.token) {
            window.open(BASE_URL + `client/download/passport/${utilisateur.id}?token=${response.data.token}`);
            return "Le passeport a été téléchargé";
        } else {
            //Error
            return response.data.message;
        }
    }
    return "";

};