import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { MODE } from "../../constants/select_constants";
import { IGenericObject, ISingleProps } from "../../interface/interfaces";
import { Utility } from "../../functions/util/Utility";
interface Props {
    data: IGenericObject,
    calcPaiement: () => void
}


const PayementsSummary = ({ data, calcPaiement }: Props) => {

    //This function set the dossier number as the option of the select
    let options: string[] = []

    const setDossierOptions = (id: number) => {

        let optionsValue: string[] = []
        Array.from(document.querySelectorAll("#produit_dossier")).map((item) => {
            let formElement = item as HTMLFormElement;
            optionsValue.push(formElement.value as string)
        })

        if (!checkArrayAreEqual(options, optionsValue)) {
            //Clean up select's options, remove dup
            let select = document.getElementById(`dossierSelect${id}`);
            if (select) select.innerHTML = "";

            //Set the options in the select
            optionsValue.map((value) => {
                let opt = document.createElement('option');
                opt.value = value;
                opt.innerHTML = value;
                options.push(value);

                if (select) select.appendChild(opt);
            })
        }
    }

    const checkArrayAreEqual = (arr1: string[], arr2: string[]) => {
        let N = arr1.length;
        let M = arr2.length;

        // If lengths of array are not equal means
        // array are not equal
        if (N != M)
            return false;

        // Sort both arrays
        arr1.sort();
        arr2.sort();

        // Linearly compare elements
        for (let i = 0; i < N; i++)
            if (arr1[i] != arr2[i])
                return false;

        // If all elements were same.
        return true;
    }

    const divPayementsDiv = (id: number) => {
        return (<div key={id} className="flex flex-wrap -mx-3 mt-2 payement">
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
                <input type="text" name={`Stotal_paiements_${id}`} id={`tot_paiement${id}`} defaultValue={data && data.length - 1 >= id ? data[id].total_paiements : ""} onChange={() => calcPaiement()} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>

            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numéro de carte</label>
                <input type="text" name={`Snumero_carte_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].numero_carte : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">No. Dossier(Remplir produits avant)</label>
                <select name={`Ssommaire_no_dossier_${id}`} id={`dossierSelect${id}`} defaultValue={data && data.length - 1 >= id ? data[id].sommaire_no_dossier : ""} onClick={() => setDossierOptions(id)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    {
                        data && data.length - 1 >= id ? (<option value={data[id].sommaire_no_dossier}>{data[id].sommaire_no_dossier}</option>) : ""
                    }
                </select>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Mode</label>
                <Select options={MODE} name={`Smode_${id}`} defaultValue={data && data.length - 1 >= id ? { label: data[id].mode, value: data[id].mode } : ""} />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Détenteur</label>
                <input type="text" name={`Sdetenteur_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].detenteur : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">CVV</label>
                <input type="number" name={`Scvv_${id}`} min={0} max={999} defaultValue={data && data.length - 1 >= id ? data[id].cvv : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Expiration</label>
                <input type="text" name={`Sexp_${id}`} id={`exp_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].exp : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>

        </div>);
    }

    const [counter, setCounter] = useState<number>(0);
    const [payementsDiv, setPayementsDiv] = useState<Array<any>>([]);



    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        setCounter(0)
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setPayementsDiv([divPayementsDiv(0)])
        }
    }, [])

    useEffect(() => {
        if (data && data.length > 0) {
            setCounter(data.length);
            let newArr = new Array(data.length);
            for (let i = 0; i < data.length; i++) {

                newArr[i] = divPayementsDiv(i);
            }
            setPayementsDiv([...newArr])
        }
    }, [data])

    const handleClick = (action: string): void => {

        if (action === "add") {
            if (counter < 12) {
                setCounter(counter + 1);
                if (new URL(window.location.href).searchParams.get("action") == "edit") {
                    setPayementsDiv([...payementsDiv, divPayementsDiv(counter)]);
                } else setPayementsDiv([...payementsDiv, divPayementsDiv(counter + 1)]);
            }
        } else {


            if (document.querySelectorAll(".payement").length > 1) {
                setCounter(counter - 1);


                let newArray: Array<any> = payementsDiv;
                newArray.pop();
                setPayementsDiv([...newArray]);

                calcPaiement()

            }
        }
    }



    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 mt-8">Sommaire des paiements reçus</h1>
            {payementsDiv.map((item) => item)}
            <div className="mt-2">
                <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>
                <button className=" ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" onClick={() => calcPaiement()}>Rafraîchir paiements</button>
            </div>
        </>
    );

}


export default PayementsSummary;