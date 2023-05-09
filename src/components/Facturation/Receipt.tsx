import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IGenericObject, IUtilisateur } from "../../interface/interfaces";


type ReceiptProps = {
    utilisateur: IUtilisateur
    data: IGenericObject
    dossier: string | number,
    agence: string,
    date: string
};


const Receipt = ({ utilisateur, data, dossier, agence, date }: ReceiptProps) => {

    let agency: Array<string> = utilisateur.agences.split(" ");



    const generateUniqueNumber = () => {
        return new Date().getTime() + Math.floor(Math.random() + 1_000_000_000_000);
    }
    console.log(dossier, (dossier !== "") ? dossier : generateUniqueNumber());

    useEffect(() => {
        if (dossier) {
            (document.getElementsByName("Fno_dossier")[0] as HTMLFormElement).values = dossier
        }
    }, [dossier])

    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Facturation</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                        <input type="date" name="Fdate" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Select a date" data-mdb-toggle="datepicker" defaultValue={date ? date.substring(0, 10) : new Date().toISOString().substring(0, 10)} required />
                    </div>
                </div>
                <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numéro facture: </label>
                    <input type="number" name="Fno_dossier" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={(dossier !== "") ? dossier : generateUniqueNumber()} readOnly />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent</label>
                    <input type="text" name="Fagent" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled defaultValue={utilisateur.nom} />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agence</label>
                    <select name="Fagency" defaultValue={agence ? agence : ""} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                        {agency.map((item, index) => (<option key={index} defaultValue={(data && data.hasOwnProperty("agency")) ? data.agency : ""} value={item}>{item}</option>))}
                    </select>
                </div>
            </div>

        </>
    );
}

export default Receipt;