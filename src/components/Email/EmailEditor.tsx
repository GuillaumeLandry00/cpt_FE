import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill'; // Typescript
import Select from "react-select";
import { OBJET } from "../../constants/select_constants";
import 'react-quill/dist/quill.snow.css';
import * as constants from "../../constants/email_template";
import { sendMails } from "../../functions/email";

const EmailEditor: React.FC = () => {

    const [userEmail, setUserEmail] = useState<string>("");
    const [err, setErr] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [signature, setSignature] = useState<string>(constants.SIGNATURE_CWT);
    const [value, setValue] = useState<string>(signature);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const url: URL = new URL(window.location.href);


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
        switch (valueChange) {
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
                break;
            case "retour":
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
        if (selectedValue !== "") {
            setIsLoading(true);
            //we make the api request
            if (await sendMails(userEmail, url.searchParams.get("to") as string, selectedValue, value)) {
                window.location.href = window.location.href += "&send=true"
            } else {
                setErr("Il y a eu une erreur lors de l'envoie du courriel veuillez ressayer")
            }
            setIsLoading(false);
        } else {
            setErr("Veuillez selectionner un objet");
        }
    }
    // handle onChange event of the dropdown
    const handleChange = (e: any): void => {
        setSelectedValue(e.value);
    }

    return (
        <>
            <div className="w-4/5 ml-auto mr-auto">
                <h1 className="text-xl font-bold text-center mt-5">Envoie de courriel</h1>
                {(url.searchParams.get("send") as string) && (<span className="text-green-500 font-bold">Courriel envoyée</span>)}
                {isLoading ? (
                    <div className="w-full mt-10">
                        <h3 className="text-l font-bold text-center mt-5">Envoie de courriel</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div>) :
                    (<>
                        <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Gabarit par défaut: </label>
                        <select name="templateSelector" defaultValue="aucun" id="templateSelector" onChange={(e) => { handleSelect(e.target.value) }} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="aucun" >Aucun</option>
                            <option value="facMSH">Facturation MSH</option>
                            <option value="facVAPF">Facturation VAPF</option>
                            <option value="facProduire">Facture à produire</option>
                            <option value="depart">Message de départ</option>
                            <option value="retour">Message de retour</option>
                        </select>
                        {err && (<span className="font-bold text-red-500 ">{err}</span>)}
                        <p className="text-m mt-5">De: <span className="font-bold text-l">{userEmail} </span> </p>
                        <p className="text-m">À: <span className="font-bold text-l">{url.searchParams.get("to")}, {"<AgentTechnique>"}</span> </p>
                        <div className="w-full ml-auto mr-auto flex row-auto">

                            <div className="w-1/2">
                                <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Objet: </label>
                                <Select options={OBJET} id="objectSelect" name="objectSelect" onChange={handleChange} value={OBJET.find(obj => obj.value === selectedValue)} className="block appearance-none w-full  text-gray-700 py-1  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
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