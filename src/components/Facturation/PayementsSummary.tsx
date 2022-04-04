import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { MODE } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";

const PayementsSummary = ({ data }: ISingleProps) => {

    const divPayementsDiv = (id: number) => {
        return (<div key={id} className="flex flex-wrap -mx-3 mt-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                <input type="date"
                    name={`Spaiement_date_${id}`}
                    defaultValue={data && data.length - 1 >= id ? data[id].paiement_date : ""}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Select a date" data-mdb-toggle="datepicker" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Montant</label>
                <input type="text" name={`Stotal_paiements_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].total_paiements : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Mode</label>
                <Select options={MODE} name={`Smode_${id}`} defaultValue={data && data.length - 1 >= id ? { label: data[id].mode, value: data[id].mode } : ""} />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numéro de carte</label>
                <input type="number" name={`Snumero_carte_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].numero_carte : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Détenteur</label>
                <input type="text" name={`Sdetenteur_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].detenteur : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">CVV</label>
                <input type="number" name={`Scvv_${id}`} min={100} max={999} defaultValue={data && data.length - 1 >= id ? data[id].cvv : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Expiration</label>
                <input type="text" name={`Sexp_${id}`} id={`exp_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].exp : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">No. Dossier</label>
                <input type="text" name={`Ssommaire_no_dossier_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].sommaire_no_dossier : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
        </div>);
    }


    const [counter, setCounter] = useState<number>(0);
    const [payementsDiv, setPayementsDiv] = useState<Array<any>>([]);

    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setPayementsDiv([divPayementsDiv(0)])
        }
    }, [])

    useEffect(() => {

        if (data != undefined) {
            setCounter(data.length);

            for (let i = 0; i < data.length; i++) {
                payementsDiv[i] = divPayementsDiv(i);
            }
        }
    }, [data])

    const handleClick = (action: string): void => {


        if (action === "add") {
            if (counter < 12) {
                setCounter(counter + 1);
                setPayementsDiv([...payementsDiv, divPayementsDiv(counter)]);
            }
        } else {


            if (counter >= 1) {
                setCounter(counter - 1);
                let newArray: Array<any> = payementsDiv;
                newArray.pop();
                setPayementsDiv([...newArray]);
            }
        }
    }



    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 mt-8">Sommaire des paiements recus</h1>
            {payementsDiv.map((item) => item)}
            <div className="mt-2">
                <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>
        </>
    );

}


export default PayementsSummary;