import axios from "axios";
import { time } from "console";
import { BASE_URL, EMAIL } from "../../constants/constantes";
import { IGenericObject, IUtilisateur } from "../../interface/interfaces";
import { authToken } from "./authentification";

/**
 * This function will format  a date to AAAA/MM/DD
 * @param date, the date that need to be formatted 
 * @returns 
 */
export const formatDate = (date: Date, separation: string): string => {
    let formatedDate = date;
    return formatedDate.getFullYear() + separation + (formatedDate.getMonth() + 1) + separation + formatedDate.getDate();
}

/**
 * This function will get all the events that are coming
 * @returns all the events that are coming from this date
 */
export const getEvents = async (id = "0"): Promise<any> => {
    try {
        const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);

        return new Promise(async (resolve) => {
            let url = BASE_URL + `reservation/${id}`
            if (utilisateur.typeUtilisateur == 1) url += `?view=all`;

            const response: any = await axios.get(url, { headers: { "x-access-token": localStorage.getItem('token') as string } });
            authToken(response.data);
            resolve(response.data);
        })

    } catch (error: unknown) {
        console.log(error);
    }
}

/**
 * This function will get all the events that are coming
 * @returns all the events that are coming from this date
 */
export const addEventsDB = async (date: Date, timeSlots: number): Promise<any> => {
    try {
        const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);

        //We build the data for the events
        const params: URLSearchParams = new URLSearchParams();
        params.append("id", utilisateur.id as string);
        params.append("date", formatDate(date, "-"));
        params.append("time", String(timeSlots));

        const response = await axios({
            method: "post",
            url: BASE_URL + "reservation/",
            data: params,
            headers: { "x-access-token": localStorage.getItem('token') as string },
        });

        authToken(response.data);
        return response.data

    } catch (error: unknown) {
        console.log(error);
    }
}


/**
 * This function will set the color depending on the avaibality
 */
export const setColorDate = (date: Date, events: Array<IGenericObject>): string => {
    let count = 0;

    for (let i = 0; i < events.length; i++) {
        if (events[i].date.getTime() == date.getTime()) {
            count++
        }
        if (count > 5) break;
    }

    return count > 5 ? "complete" : "notComplete";
}

export const countAvaibality = (events: IGenericObject, date: Date, timeSlots: number, capacity: number): number => {

    let count = capacity;
    console.log("The capacity is ", count);

    //We loop through the array 
    for (let i = 0; i < events.length; i++) {
        if (new Date(events[i].date).getTime() == date.getTime() && events[i].time == timeSlots) {
            count--
        }
        if (count < 1) break;
    }

    console.log("After coding... ", count);

    return count;

}

/**
 * The number will be switched to a tiem string
 * @param time, time number 
 * @returns 
 */
export const convertNumberToTime = (time: number): string => {

    let convertedTime: string;

    switch (time) {
        case 0:
            convertedTime = "8AM-11PM";
            break;
        case 1:
            convertedTime = "11AM-18PM";
            break;
        case 2:
            convertedTime = "18PM-23PM";
            break;
        default:
            convertedTime = "";
            break;
    }

    return convertedTime;
}

export const deleteEvent = async (id: number): Promise<number> => {
    const response = await axios({
        method: "delete",
        url: BASE_URL + `reservation/${id}`,
        headers: { "x-access-token": localStorage.getItem('token') as string },
    });

    return response.data.affectedRows;
}


export const checkIfUserRegistred = (list: IGenericObject, dateToCheck: Date): boolean => {

    let rtr = false;
    let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)

    for (let i = 0; i < list.length; i++) {
        if (new Date(list[i].date).getTime() == dateToCheck.getTime() && list[i].fk_agent_id == utilisateur.id) {
            rtr = true
        }

    }

    return rtr;
}

export const getWhoWork = (list: IGenericObject, dateToCheck: Date): Array<Array<string>> => {
    let nameOfWorkers: Array<Array<string>> = [[], [], []];
    for (let i = 0; i < list.length; i++) {
        if (new Date(list[i].date).getTime() == dateToCheck.getTime()) {
            nameOfWorkers[list[i].time].push(list[i].nomComplet);
        }
    }

    console.log(nameOfWorkers);
    return nameOfWorkers;
}   