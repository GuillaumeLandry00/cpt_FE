import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { PRODUCT_TYPE } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";

const TravelProducts = ({ data, setOpcAmount }: ISingleProps) => {

    const divProducts = (id: number,) => {

        return (<div className="flex flex-wrap -mx-3 mt-2" key={id}>
            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type de produit</label>
                <Select name={`Ttype_produit_${id}`} options={PRODUCT_TYPE} defaultValue={data && data.length - 1 >= id ? { label: data[id].type_produit, value: data[id].type_produit } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
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
                <input name={`Tprix_${id}`} type="number" id={`prix${id}`} step=".01" defaultValue={data && data.length - 1 >= id ? data[id].prix : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="123456" />
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
        if (!(url.searchParams.get("id") && url.searchParams.get("action") == "edit")) {
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
                setProductsDiv([...productsDiv, divProducts(counter + 1)]);
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
        for (let i = 0; i < counter; i++) {
            let qty: number = parseInt((document.getElementById(`qty${i}`) as HTMLInputElement).value);
            let price: number = parseInt((document.getElementById(`prix${i}`) as HTMLInputElement).value);
            sum += qty * price;
        }
        if (setOpcAmount) setOpcAmount(sum);
    }

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Détail des produits-voyage</h1>
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