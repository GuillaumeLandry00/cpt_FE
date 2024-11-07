import React, { useEffect, useState } from "react";
// import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { PRODUCT_TYPE } from "../../constants/select_constants";
import { IGenericObject } from "../../interface/interfaces";
import { LocalStorageKeys } from "../../constants/constantes";

type ProductProps = {
    data: IGenericObject;
    newTaxesCalculator: () => void;
};

let counterPreserved = 0;

const TravelProducts = React.memo(({ data, newTaxesCalculator }: ProductProps) => {

    const productCache = JSON.parse(localStorage.getItem(LocalStorageKeys.Products) as string);
    
    const divProducts = (id: number) => {
        // if (new URL(window.location.href).searchParams.get("action") !== "edit") id
        return (<div className="flex flex-wrap -mx-3 mt-2 product" key={id + 1}>
            <div className="w-full md:w-3/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fournisseur</label>
                <select onChange={() => { newTaxesCalculator() }} name={`Ttype_produit_${id}`} id={`mySelectProduct${id}`} defaultValue={data && data.length - 1 >= id ? data[id].type_produit : "0"} className="block appearance-none bg-gray-200 border w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    {PRODUCT_TYPE.map((item, index) => (<option key={item.id} value={item.id} >{item.label}</option>))}
                    {productCache ? productCache.value.map((item: any) => (<option key={item.id} value={item.id} >{item.label}</option>)) : PRODUCT_TYPE.map((item, index) => (<option key={item.id} value={item.id} >{item.label}</option>))}
                </select>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Quantité</label>
                <input name={`Tqty_${id}`} onChange={() => { newTaxesCalculator() }} type="number" id={`qty${id}`} min={0} defaultValue={data && data.length - 1 >= id ? data[id].qty : "0"} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="1" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Prix</label>
                <input name={`Tprix_${id}`} type="number" id={`prix${id}`} step="0.01" defaultValue={data && data.length - 1 >= id ? data[id].prix : "0"} onChange={() => { newTaxesCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Taxes</label>

                <input name={`Ttaxes${id}`} type="number" step="any" min={0} defaultValue={data && data.length - 1 >= id ? data[id].taxe : "0"} onChange={() => { newTaxesCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">No.dossier fournisseur</label>
                <input name={`Tproduit_dossier_${id}`} type="text" id="produit_dossier" defaultValue={data && data.length - 1 >= id ? data[id].produit_dossier : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
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
                <input name={`Tescompte_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].escompte : "0"} onChange={() => { newTaxesCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Total</label>
                <input name={`Ttotal_${id}`} type="number" step=".01" defaultValue={data && data.length - 1 >= id ? data[id].total : ""} onChange={() => { newTaxesCalculator() }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="0.00" />
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
    const [counter, setCounter] = useState(counterPreserved);
    const [initialized, setInitialized] = useState(false);

    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setProductsDiv([divProducts(0)])
        }
    }, [])

    //This will help us deal with the default values
    useEffect(() => {
        if (data && data.length > 0 && !initialized) {
            setCounter(data.length);
            let newArr = new Array(data.length);
            for (let i = 0; i < data.length; i++) {

                newArr[i] = divProducts(i);
            }
            console.log("Setting data... ", data.length);
            setInitialized(true);
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

            if (document.querySelectorAll(".product").length > 1) {

                //We update taxes...
                setCounter(counter - 1);

                let newArray: Array<any> = productsDiv;
                newArray.pop();
                setProductsDiv([...newArray]);

                newTaxesCalculator()

            }
        }


        //HARD FIX
        setTimeout(() => {
            counterPreserved = document.querySelectorAll(".product").length
        }, 100)
    }

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Détail des produits voyages </h1>
            <small className="text-sm text-center text-orange-500">**Veuillez selectionner un produit, la quantité et ensuite le prix</small>
            {productsDiv.map((item) => item)}
            <div className="mt-2">
                <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>
                <button className=" ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" onClick={() => newTaxesCalculator()}>Rafraîchir prix</button>
            </div>

        </>
    );
})

export default TravelProducts;