import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IGenericObject, IResponse, IUtilisateur } from "../../interface/interfaces";
import { authToken } from "../authentification";
import { capitalizeString } from "../clients";

/**
 * This function will ge tall the agents from the database
 * @returns response from the API
 */
export const getAllAgent = async (): Promise<any> => {
    try {
        //We make the request
        const response: IResponse = await axios.get(BASE_URL + `agent/`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);
        if (response.data)
            return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will get a single agent from the database
 * @param id, id of the agent 
 * @returns response from the API
 */
export const getAgent = async (id: number) => {
    try {
        //We make the request
        const response: IResponse = await axios.get(BASE_URL + `agent/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

/**
 * The function will update an agent from the database
 * @param id, id of the agent 
 * @returns response from the API
 */
export const updateAgent = async (agent: agentUpdate, id: number) => {
    try {

        const params = new URLSearchParams();
        params.append("user_type", String(agent.user_type));
        params.append("comm", String(agent.comm));
        params.append("agences", agent.agence);

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `agent/${id}`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });

        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


/**
 * This function will add an agent to the database
 * @param id, id of the agent 
 * @returns response from the API
 */
export const addAgentDB = async (agent: agentAdd) => {
    try {

        const params = new URLSearchParams();
        params.append("user_type", String(agent.user_type));
        params.append("comm", String(agent.comm));
        params.append("agences", agent.agences);
        params.append("email", agent.email);
        params.append("nom", capitalizeString(agent.name.trim()));
        params.append("nomComplet", capitalizeString(agent.name.trim()) + " " + capitalizeString(agent.last_name.trim()));

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `agent/`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


/**
 * This function will delete an agent from the database
 * @param id, id of the agent 
 * @returns response from the API
 */
export const deleteAgent = async (id: number) => {
    try {
        //We make the request
        const response: IResponse = await axios.delete(BASE_URL + `agent/${id}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
        authToken(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**  Type declaration for the function **/
export type agentAdd = {
    user_type: number,
    comm: number,
    agences: string,
    email: string,
    last_name: string,
    name: string
}

type agentUpdate = {
    user_type: number,
    comm: number,
    agence: string
}

