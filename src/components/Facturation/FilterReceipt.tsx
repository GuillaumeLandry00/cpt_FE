import React, { useEffect, useState } from "react";
import { IReceipt } from "../../interface/interfaces";


interface FilterReceipt {
    setOrder: (value: string | ((prevVar: string) => string)) => void,
    setBy: (value: string | ((prevVar: string) => string)) => void,
    getData: () => void,
}

const FilterReceipt = (props: FilterReceipt) => {

    return (
        <div className="mt-4 flex flex-wrap">
            <div className="relative w-40">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Ordre: </label>
                <select onChange={(e) => props.setOrder(e.target.value)} className="block appearance-none bg-gray-200 border w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    <option value={"DESC"}>Décroissant</option>
                    <option value={"ASC"}>Croissant</option>
                </select>
                <div className="pointer-events-none top-10 absolute  right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div className="relative w-40 ml-10">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Par: </label>
                <select onChange={(e) => props.setBy(e.target.value)} className="block appearance-none bg-gray-200 border w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                    <option value={"dossier"}>No dossier</option>
                    <option value={"date"}>Date de création</option>
                </select>
                <div className="pointer-events-none top-10 absolute  right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div className="relative ml-auto mt-5 ">
                <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { props.getData() }}>Filtrer</button>
            </div>
        </div>);
}

export default FilterReceipt;