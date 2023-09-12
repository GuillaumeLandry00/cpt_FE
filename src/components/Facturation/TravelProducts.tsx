import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { OPC_RATE, TAXE_RATE, TPS_RATE, TVQ_RATE } from "../../constants/constantes";
import { PRODUCT_TYPE } from "../../constants/select_constants";
import { IGenericObject } from "../../interface/interfaces";

type ProductProps = {
    data: IGenericObject
    setOpcAmount: Dispatch<SetStateAction<number>>;
    setGrandTotal: Dispatch<SetStateAction<number>>;
    no_dossier: number;
};

const TravelProducts = ({ data, setOpcAmount, setGrandTotal, }: ProductProps) => {

    const divProducts = (id: number) => {
        // if (new URL(window.location.href).searchParams.get("action") !== "edit") id
        return (<div className="flex flex-wrap -mx-3 mt-2 product" key={id}>
            <div className="w-full md:w-3/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fournisseur</label>
                <select onChange={() => { taxesCalculator(id) }} name={`Ttype_produit_${id}`} id={`mySelectProduct${id}`} defaultValue={data && data.length - 1 >= id ? data[id].type_produit : "0"} className="block appearance-none bg-gray-200 border w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {PRODUCT_TYPE.map((item, index) => (<option key={item.id} value={item.id} >{item.label}</option>))}
                </select>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Quantité</label>
                <input name={`Tqty_${id}`} onChange={() => { taxesCalculator(id) }} type="number" id={`qty${id}`} min={0} defaultValue={data && data.length - 1 >= id ? data[id].qty : "0"} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="1" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Prix</label>
                <input name={`Tprix_${id}`} type="number" id={`prix${id}`} step="0.01" min={0} defaultValue={data && data.length - 1 >= id ? data[id].prix : "0"} onChange={() => { taxesCalculator(id) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Taxes</label>

                <input name={`Ttaxes${id}`} type="number" step="any" min={0} defaultValue={data && data.length - 1 >= id ? data[id].taxe : "0"} onChange={() => { taxesCalculator(id) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">No.dossier fournisseur</label>
                <input name={`Tproduit_dossier_${id}`} type="text" defaultValue={data && data.length - 1 >= id ? data[id].produit_dossier : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TPS</label>
                <input name={`Tproduit_tps_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].produit_tps : "0"} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TVQ</label>
                <input name={`Tproduit_tvq_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].produit_tvq : "0"} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Escompte</label>
                <input name={`Tescompte_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].escompte : "0"} onChange={() => { taxesCalculator(id, false) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Total</label>
                <input name={`Ttotal_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].total : ""} onChange={() => { opcCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0" >
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Type de produit</label>
                <textarea
                    name={`Tproduit_note_${id}`}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-12"
                    defaultValue={data && data.length - 1 >= id ? data[id].produit_note : ""}
                >
                </textarea>
            </div>
        </div>);
    }

    const [productsDiv, setProductsDiv] = useState<Array<any>>([]);
    const [counter, setCounter] = useState(0);


    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setProductsDiv([divProducts(0)])
        }
    }, [])

    //This will help us deal with the default values
    useEffect(() => {
        if (data && data.length > 0) {
            setCounter(data.length);
            let newArr = new Array(data.length);
            for (let i = 0; i < data.length; i++) {

                newArr[i] = divProducts(i);
            }
            setProductsDiv([...newArr])
        }
    }, [data])

    //This handle our click by removing/adding inputs
    const handleClick = (action: string): void => {

        if (action === "add") {
            if (counter < 12) {
                setCounter(counter + 1);
                if (new URL(window.location.href).searchParams.get("action") == "edit") {
                    setProductsDiv([...productsDiv, divProducts(counter)]);
                } else setProductsDiv([...productsDiv, divProducts(counter + 1)]);

            }
        } else {
            if (counter >= 1) {
                setCounter(counter - 1);
                let newArray: Array<any> = productsDiv;
                newArray.pop();
                setProductsDiv([...newArray]);
            }
        }
    }

    //This we calculate the total amount of OPC
    const opcCalculator = (): void => {
        let sum = 0;
        let bigSum = 0;

        console.log("We calculate the price...", document.querySelectorAll(".product").length);
        let productsLength = document.querySelectorAll(".product").length

        for (let i = 0; i < productsLength; i++) {
            if (document.getElementById(`mySelectProduct${i}`)) {
                let index: number = parseInt((document.getElementById(`mySelectProduct${i}`) as HTMLInputElement).value);
                let total: number = parseFloat((document.getElementsByName(`Ttotal_${i}`)[0] as HTMLInputElement).value)

                //For opc
                if (PRODUCT_TYPE[index].opc !== '0') {
                    sum += total
                }
                //For grand total
                bigSum += total
            }
        }

        (document.getElementById("opc") as HTMLFormElement).value = Math.round((sum * OPC_RATE + Number.EPSILON) * 100) / 100;
        (document.getElementById("grand_total") as HTMLFormElement).value = Math.round(((bigSum + sum * OPC_RATE) + Number.EPSILON) * 100) / 100;;
    }

    const taxesCalculator = async (id: string | number, calcTaxes = true): Promise<void> => {

        let qty: string = (document.getElementById(`qty${id}`) as HTMLInputElement).value;
        let price: string = (document.getElementById(`prix${id}`) as HTMLInputElement).value;

        //We check if the user has entered anything
        if (qty != '' && price != '') {
            let index: number = parseFloat((document.getElementById(`mySelectProduct${id}`) as HTMLInputElement).value);

            //Calculate the sum of each fields
            let sum = parseFloat(qty) * parseFloat(price);
            let tpsSum = PRODUCT_TYPE[index].tps !== '0' ? String(Math.round((sum * TPS_RATE + Number.EPSILON) * 100) / 100) : "0";
            let tvqSum = PRODUCT_TYPE[index].tvq !== '0' ? String(Math.round((sum * TVQ_RATE + Number.EPSILON) * 100) / 100) : "0";

            //We add the correct sum at each field
            (document.getElementsByName(`Tproduit_tps_${id}`)[0] as HTMLInputElement).value = tpsSum;
            (document.getElementsByName(`Tproduit_tvq_${id}`)[0] as HTMLInputElement).value = tvqSum;
            if(PRODUCT_TYPE[index].taxe == '0'){
                (document.getElementsByName(`Ttaxes${id}`)[0] as HTMLInputElement).value = String(Math.round((parseFloat(tpsSum) + parseFloat(tvqSum) + Number.EPSILON) * 100) / 100)
            }
            
            

            let taxSum = PRODUCT_TYPE[index].taxe !== '0' ? parseFloat((document.getElementsByName(`Ttaxes${id}`)[0] as HTMLInputElement).value) * parseFloat(qty) : parseFloat((document.getElementsByName(`Ttaxes${id}`)[0] as HTMLInputElement).value);
            let discountSum = (document.getElementsByName(`Tescompte_${id}`)[0] as HTMLInputElement).value !== "" ? (parseFloat((document.getElementsByName(`Tescompte_${id}`)[0] as HTMLInputElement).value) * parseFloat(qty)) : 0;


            let finalSum = Math.round((sum + taxSum - discountSum + Number.EPSILON) * 100) / 100;


            (document.getElementsByName(`Ttotal_${id}`)[0] as HTMLInputElement).value = String(finalSum)

            opcCalculator();
        }



    }


    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Détail des produits voyages </h1>
            <small className="text-sm text-center text-orange-500">**Veuillez selectionner un produit, la quantité et ensuite le prix</small>
            {productsDiv.map((item) => item)}
            <div className="mt-2">
                <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>

        </>
    );
}

export default TravelProducts;