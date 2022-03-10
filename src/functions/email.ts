import axios from "axios";

export const sendMails = async (from: string, to: string, object: string, msg: string): Promise<boolean> => {

    //We build the body of the request
    let formData = new FormData();
    formData.append("from", from);
    formData.append("to", to);
    formData.append("object", object);
    formData.append("msg", msg);

    const response: boolean = await axios.post("https://www.voyagesgabymsh.ca/wp-json/mail/send", formData)
    return response;
}