import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IGenericObject, IUtilisateur } from "../../interface/interfaces";


type ReceiptProps = {
    utilisateur: IUtilisateur
    data: IGenericObject
    dossier: string | number,
    agence: string,
    date: string
};


const Receipt = ({ utilisateur, data, dossier, agence, date }: ReceiptProps) => {

    let agency: Array<string> = utilisateur.agences.split(",").join(" ").split(" ").reverse()
    const [noDossier, setNoDossier] = useState("")
    const [succ, setSucc] = useState("")
    const [dateDossier, setDateDossier] = useState(new Date().toISOString().substring(0, 10))


    const generateUniqueNumber = () => {
        return new Date().getTime() + Math.floor(Math.random() + 1_000_000_000_000);
    }

    useEffect(() => {
        if (dossier !== "") {
            setNoDossier(String(dossier));
        } else {
            setNoDossier(String(generateUniqueNumber()))
        }
        if (date) setDateDossier(date.substring(0, 10))
    }, [dossier])

    useEffect(() => {
        setSucc(agence)
    }, [agence])


    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Facturation</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                        <input type="date" name="Fdate" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Select a date" data-mdb-toggle="datepicker" value={dateDossier} onChange={(e) => setDateDossier(e.target.value)} required />
                    </div>
                </div>
                <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numéro facture: </label>
                    <input type="number" name="Fno_dossier" id="no_dossier" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={(dossier !== "") ? dossier : generateUniqueNumber()} value={noDossier} readOnly />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent</label>
                    <input type="text" name="Fagent" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled defaultValue={utilisateur.nom} />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agence</label>
                    <select name="Fagency" defaultValue={agence ? agence : ""} value={succ} onChange={(e) => { setSucc(e.target.value) }} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                        {agency.map((item, index) => (<option key={index} defaultValue={(data && data.hasOwnProperty("agency")) ? data.agency : ""} value={item.replace("cwt", "gaby")}>{item.replace("cwt", "gaby")}</option>))}
                    </select>
                </div>
            </div>

        </>
    );
}

export default Receipt;