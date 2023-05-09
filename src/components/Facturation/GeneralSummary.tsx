import React, { useEffect, useState } from "react";
import { ISingleProps } from "../../interface/interfaces";

const GeneralSummary = ({ data }: ISingleProps) => {


    return (
        <>
            <h1 className="text-2xl  text-center border-b-2">Sommaire général</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Courriel</label>
                    <input type="text" name="courriel" defaultValue={data ? data.courriel : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Total des paiements</label>
                    <input type="number" name="tot_paiement" id="total_paiement" defaultValue={data ? data.tot_paiement : ""} step="0.1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">*Balance à recevoir</label>
                    <input type="number" name="balance" step="0.1" id="balance" defaultValue={data ? data.balance : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">*Date Paiement final</label>
                    <input type="date"
                        name="general_date"
                        defaultValue={data ? data.general_date : ""}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Select a date" data-mdb-toggle="datepicker" />
                </div>
            </div>
        </>
    );

}


export default GeneralSummary;