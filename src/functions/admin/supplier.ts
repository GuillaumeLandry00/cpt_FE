import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IResponse } from "../../interface/interfaces";
import { ISupplier } from "../../interface/interface_admin";
import { authToken } from "../agent/authentification";
import { capitalizeString } from "../agent/clients";

/**
 * This function will fetch all the sup from the database
 */
export const getSuppliers = async (search = "", limit = 25, offset = 0, type = "admin"): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<ISupplier[]>(BASE_URL + `admin/supplier?search=${search}&limit=${limit}&offset=${offset}&type=${type}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });

        authToken(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will fetch all the Taxes from the database
 */
export const getSupplier = async (id: number): Promise<unknown> => {
    try {

        //We make the request
        const response = await axios.get<ISupplier[]>(BASE_URL + `admin/supplier/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will delete the selected Taxes from the database
 */
export const deleteSupplier = async (id: number) => {
    try {

        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `admin/supplier/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const updateSupplier = async (data: ISupplier, id: number) => {
    try {
        const params = new URLSearchParams();
        params.append("type", String(data.type));
        params.append("nom", String(data.nom));
        params.append("code", String(data.code));
        params.append("devise", String(data.devise));
        params.append("gl_achat", String(data.gl_achat));
        params.append("agent", String(data.agent));
        params.append("inactif", String(data.inactif));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `admin/supplier/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const addSupplier = async (data: ISupplier) => {
    try {

        const params = new URLSearchParams();
        params.append("type", String(data.type));
        params.append("nom", String(data.nom));
        params.append("code", String(data.code));
        params.append("devise", String(data.devise));
        params.append("gl_achat", String(data.gl_achat));
        params.append("agent", String(data.agent));
        params.append("adresse", String(data.adresse));
        params.append("inactif", String(data.inactif));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `admin/supplier/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}

export const validateSupplier = (data: ISupplier): boolean => {


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
