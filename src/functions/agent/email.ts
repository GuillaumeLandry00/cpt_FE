import axios from "axios";
import { BASE_URL, EMAIL } from "../../constants/constantes";
import { IGenericObject } from "../../interface/interfaces";

export const sendMails = async (from: string, to: string, object: string, msg: string, id: string): Promise<boolean> => {


    //Send the email right now
    const params: URLSearchParams = new URLSearchParams();
    params.append("to", to)
    params.append("from", from)
    params.append("subject", object)
    params.append("id", id)

    msg += `<p>Vous pouvez me contacter directement par email à <a href="mailto:${from}">${from}</a></p>`;
    params.append("msg", msg)

    //Call to the API
    const response: {success: boolean} =(await axios.post(`${BASE_URL}mail/${to}`, params)).data
    console.log("ICI", response);
    
    if(response){        
        return response.success
    }else return false
}

export const addCronTask = async (from: string, to: string, object: string, msg: string, type: string, sendingDate: string): Promise<any> => {
    let userInfo = JSON.parse(localStorage.getItem("utilisateur") as string);

    //We build the body of the request
    const params: URLSearchParams = new URLSearchParams();
    params.append("sending_date", sendingDate);
    params.append("from", EMAIL);
    params.append("to", to);
    params.append("object", object);
    params.append("id_agent", userInfo.id);

    //we add the custom signature 
    msg += `<p>Vous pouvez me contacter directement par email à <a href="mailto:${from}">${from}</a></p>`;

    params.append("msg", msg);
    params.append("type", type);

    const response = await axios({
        method: "post",
        url: BASE_URL + `cron`,
        data: params,
        headers: { "Content-Type": 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
    });;
    return response;
}


export const getCronTask = async (email: string = ""): Promise<Array<ICronTask>> => {
    let userInfo = JSON.parse(localStorage.getItem("utilisateur") as string);
    const response: any = await axios.get(`${BASE_URL}cron/${userInfo.id}`);
    return response.data;
}

export const deleteCronTask = async (id: number): Promise<IGenericObject> => {
    const response: IGenericObject = await axios.delete(`${BASE_URL}cron/${id}`);
    window.location.href = window.location.href
    return response;
}

export type ICronTask = {
    ID: number,
    sending_date: string,
    from: string,
    to: string,
    object: string,
    msg: string,
    status?: string,
    type: string
}
