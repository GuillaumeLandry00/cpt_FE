import React, { useEffect, useState } from "react";
// import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { TAXE_RATE, TPS_RATE, TVQ_RATE } from "../../constants/constantes";
import { PRODUCT_TYPE } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";

const TravelProducts = ({ data, setOpcAmount, setGrandTotal }: ISingleProps) => {

    const divProducts = (id: number,) => {

        return (<div className="flex flex-wrap -mx-3 mt-2" key={id}>
            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type de produit</label>
                <select onChange={() => { taxesCalculator() }} name="mySelectProduct" id={`mySelectProduct${id}`} className="block appearance-none bg-gray-200 border w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {PRODUCT_TYPE.map((item, index) => (<option key={index} value={index}>{item.label}</option>))}
                </select>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">No dossier</label>
                <input name={`Tno_dossier_${id}`} type="number" required min={0} defaultValue={data && data.length - 1 >= id ? data[id].no_dossier : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Quantité</label>
                <input name={`Tqty_${id}`} type="number" id={`qty${id}`} min={0} defaultValue={data && data.length - 1 >= id ? data[id].qty : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Prix</label>
                <input name={`Tprix_${id}`} type="number" id={`prix${id}`} step=".01" defaultValue={data && data.length - 1 >= id ? data[id].prix : ""} onChange={() => { taxesCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Taxes</label>
                <input name={`Ttaxes${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].taxe : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                <input name={`Tproduit_note_${id}`} type="text" defaultValue={data && data.length - 1 >= id ? data[id].produit_note : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TPS</label>
                <input name={`Tproduit_tps_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].produit_tps : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TVQ</label>
                <input name={`Tproduit_tvq_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].produit_tvq : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Escompte</label>
                <input name={`Tescompte_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].escompte : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Total</label>
                <input name={`Ttotal_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].total : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
            </div>
        </div>);
    }

    const [productsDiv, setProductsDiv] = useState<Array<any>>([]);
    const [counter, setCounter] = useState<number>(0);

    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setProductsDiv([divProducts(0)])
        }
    }, [])

    //This will help us deal with the default values
    useEffect(() => {
        if (data != undefined) {
            setCounter(data.length);
            for (let i = 0; i < data.length; i++) {
                productsDiv[i] = divProducts(i);
            }
        }
    }, [data])


    //This handle our click by removing/adding inputs
    const handleClick = (action: string): void => {
        if (action === "add") {
            if (counter < 12) {
                setCounter(counter + 1);
                setProductsDiv([...productsDiv, divProducts(counter)]);
            }
        } else {
            if (counter > 0) {
                setCounter(counter - 1);
                let newArray: Array<any> = productsDiv;
                newArray.pop();
                setProductsDiv([...newArray]);
            }
        }
    }

    //This we calculate the total amount of OPC
    const opcCalculator = (): void => {
        let sum = 0
        for (let i = 0; i < counter+1; i++) {
            let qty: number = parseInt((document.getElementById(`qty${i}`) as HTMLInputElement).value);
            let price: number = parseInt((document.getElementById(`prix${i}`) as HTMLInputElement).value);


            sum += qty * price;
        }
        console.log("My sum of opc is: ", sum);
        
        if (setOpcAmount) setOpcAmount(sum);
        if (setGrandTotal) setGrandTotal(sum + sum * TAXE_RATE);
    }

    const taxesCalculator = (): void => {
        

        for (let i = 0; i < counter + 1; i++) {
            let qty: string = (document.getElementById(`qty${i}`) as HTMLInputElement).value;
            let price: string = (document.getElementById(`prix${i}`) as HTMLInputElement).value;
            
            //We check if the user has entered anything
            if (qty != '' && price != '') {
                let index: number = parseInt((document.getElementById(`mySelectProduct${i}`) as HTMLInputElement).value);
                let sum = parseInt(qty) * parseInt(price);

                //We add
                if (PRODUCT_TYPE[index].taxe !== '0') { (document.getElementsByName(`Ttaxes${i}`)[0] as HTMLInputElement).value = String(sum * TAXE_RATE) };
                (document.getElementsByName(`Tproduit_tps_${i}`)[0] as HTMLInputElement).value = String(sum * TPS_RATE);
                (document.getElementsByName(`Tproduit_tvq_${i}`)[0] as HTMLInputElement).value = String(sum * TVQ_RATE);

                (document.getElementsByName(`Ttotal_${i}`)[0] as HTMLInputElement).value = String(sum + sum * TAXE_RATE);
            }
        }
    }

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Détail des produits-voyage </h1>
            <small className="text-sm text-center text-orange-500">**Veuillez selectionner un produit, la quantité et ensuite le prix</small>
            {productsDiv.map((item) => item)}
            <div className="mt-2">
                <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>
                <button onClick={() => { opcCalculator() }} className="mt-0 ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">Calculer l'opc</button>

            </div>

        </>
    );
}

export default TravelProducts;