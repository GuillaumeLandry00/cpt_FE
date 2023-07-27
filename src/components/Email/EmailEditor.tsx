import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill'; // Typescript
import Select from "react-select";
import { OBJET } from "../../constants/select_constants";
import 'react-quill/dist/quill.snow.css';
import * as constants from "../../constants/email_template";
import { addCronTask, sendMails } from "../../functions/agent/email";

const EmailEditor: React.FC = () => {

    const [userEmail, setUserEmail] = useState<string>("");
    const [err, setErr] = useState<string>("");
    const [signature, setSignature] = useState<string>(constants.SIGNATURE_CWT);
    const [value, setValue] = useState<string>(signature);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [enableDate, setEnableDate] = useState<boolean>(false);
    const [sendingDate, setSendingDate] = useState<string>("");
    const [additionalEmail, setAdditionalEmail] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [subject, setSubject] = useState<string>("")
    const url: URL = new URL(window.location.href);
    const idReceipt = url.searchParams.get("receipt") as string


    //we get the agent mail from localstorage
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("utilisateur") as string);
        setUserEmail(userInfo.email);
    }, [])

    /**
     * This will handle our template message
     * @param valueChange, value of the template
     */
    const handleSelect = (valueChange: string): void => {
        setEnableDate(false);
        setType(valueChange);
        switch (valueChange) {
            case "birthday":
                setEnableDate(true);
                setValue(constants.MESSAGE_ANNIV + signature);
                break;
            case "christmas":
                setEnableDate(true);
                setValue(constants.MESSAGE_NOEL + signature);
                break;
            case "facMSH":
                setValue(constants.FACTURATION_MSH + signature);
                break;
            case "facVAPF":
                setValue(constants.FACTURATION_VAPF + signature);
                break;
            case "facProduire":
                setValue(constants.FACTURE_A_PRODUIRE + signature);
                break;
            case "depart":
                setValue(constants.MESSAGE_DEPART + signature);
                setEnableDate(true);
                break;
            case "retour":
                setEnableDate(true);
                setValue(constants.MESSAGE_RETOUR + signature);
                break;
            case "cwt":
                setValue(value.replace(constants.SIGNATURE_BSP, constants.SIGNATURE_CWT));
                setSignature(constants.SIGNATURE_CWT);
                break;
            case "bsp":
                setValue(value.replace(constants.SIGNATURE_CWT, constants.SIGNATURE_BSP));
                setSignature(constants.SIGNATURE_BSP);
                break;
            default:
                setValue("");
                break;

        }
    }

    const handleBtn = async (): Promise<void> => {
        setErr("")
        setResponse("");
        if (subject !== "") {
            setIsLoading(true);
            //we make the api request

            console.log(sendingDate !== new Date().toISOString().slice(0, 10) && sendingDate !== "")

            let checkboxEmail = document.getElementById("email-checkbox") as HTMLFormElement
            let clientEmail = checkboxEmail.checked ? url.searchParams.get("to") as string : "";

            //we check if we need to send the mail right now...
            if (sendingDate !== new Date().toISOString().slice(0, 10) && sendingDate !== "") {

                //we add it to the db
                if ((await addCronTask(userEmail, clientEmail, subject, value, type, sendingDate)).data.affectedRows > 0) {
                    setResponse("Tâche enregistrée");
                }
            } else {
                if (await sendMails(userEmail, clientEmail, subject, value, additionalEmail, idReceipt)) {
                    setResponse("Le courriel a été envoyé")
                } else {
                    setErr("Il y a eu une erreur lors de l'envoi du courriel veuillez ressayer")
                }
            }
            setIsLoading(false);
        } else {
            setErr("Veuillez entrer un objet");
        }
    }

    return (
        <>
            <div className="w-4/5 ml-auto mr-auto">
                <h1 className="text-xl font-bold text-center mt-5">Envoi de courriel</h1>
                {(response) && (<span className="text-green-500 font-bold">{response}</span>)}
                {isLoading ? (
                    <div className="w-full mt-10">
                        <h3 className="text-l font-bold text-center mt-5">Envoi de courriel</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div>) :
                    (<>
                        <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Gabarit par défaut: </label>
                        <select name="templateSelector" defaultValue="aucun" id="templateSelector" onChange={(e) => { handleSelect(e.target.value) }} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="aucun" >Aucun</option>
                            {url.searchParams.get("receipt") as string == null ? (
                                <>
                                    <option value="birthday">Joyeux anniversaire</option>
                                    <option value="depart">Message de départ</option>
                                    <option value="retour">Message de retour</option>
                                    <option value="christmas">Joyeux Noel</option>
                                </>
                            ) : (<>
                                <option value="facMSH">Facturation MSH</option>
                                <option value="facProduire">Facture à produire</option>
                            </>)}



                        </select>
                        {url.searchParams.get("receipt") as string !== null && (<>
                            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mt-8">Envoyer à une personne supplémentaire: </label>
                            <div className="flex">
                                <input type="text" placeholder="Courriel" value={additionalEmail} onChange={(e) => { setAdditionalEmail(e.target.value) }} className="block appearance-none w-2/5 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                <div className="flex items-center w-3/5 ml-4">
                                    <input id="email-checkbox" type="checkbox" value="oui" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="ml-2 text-m font-medium text-gray-900 dark:text-gray-600"> Sélectionner si vous souhaitez envoyer une copie à <a className="text-blue-600 dark:text-blue-500 hover:underline">{url.searchParams.get("to")}</a> (client).</label>
                                </div>
                            </div>
                        </>)}
                        {enableDate && (<> <span className=" mt-5 uppercase tracking-wide text-gray-700 text-l font-bold">Envoyer le: </span><input value={sendingDate} onChange={(e) => setSendingDate(e.target.value)} className="appearance-none  bg-gray-200 border border-gray-200 text-gray-700 mt-5 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" required /> </>)}
                        {err && (<span className="font-bold text-red-500 ">{err}</span>)}
                        <p className="text-m mt-5">De: <span className="font-bold text-l">{userEmail} </span> </p>
                        <p className="text-m">À: <span className="font-bold text-l">{"<AgentTechnique>"}</span> </p>
                        <div className="w-full ml-auto mr-auto flex row-auto">
                            <div className="w-1/2">
                                <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Objet: </label>
                                <input type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="objectSelect" name="objectSelect" placeholder="objet" />
                                <Select options={OBJET} onChange={(e) => setSubject(e?.value as string)} value={OBJET.find(obj => obj.value === subject)} className="block appearance-none w-full  text-gray-700 py-1  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                            </div>
                            <div className="w-1/2">
                                <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Signature: </label>
                                <select name="templateSelector" id="templateSelector" defaultValue="cwt" onChange={(e) => { handleSelect(e.target.value) }} className="block appearance-none w-full ml-1 border border-gray-200 text-gray-700 bg-white py-2 mt-1 px-1  pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value="cwt">Cwt</option>
                                    <option value="bsp">Bsp</option>
                                </select>
                            </div>
                        </div>


                        <div className="w-full">
                            <ReactQuill theme="snow" value={(value)} onChange={setValue} />
                        </div>
                        <button onClick={() => { handleBtn() }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-8">Envoyer le courriel</button>
                    </>)}
            </div>
        </>
    );
}

export default EmailEditor;