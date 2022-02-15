import React, { useEffect } from "react";


type ReceiptProps = {
    utilisateur: any
};

const Receipt = ({ utilisateur }: ReceiptProps) => {

    let agency: [] = utilisateur.agences.split(" ");


    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Facturation</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                        <input type="date" name="Fdate" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Select a date" data-mdb-toggle="datepicker" required />
                    </div>
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TPS</label>
                    <input type="text" name="Ftps" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled defaultValue={"841822257"} value={"841822257"} />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TVQ</label>
                    <input type="text" name="Ftvq" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled defaultValue={"1215801442"} />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent</label>
                    <input type="text" name="Fagent" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" disabled defaultValue={utilisateur.nom} />
                </div>
                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agence</label>
                    <select name="Fagency" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                        {agency.map((item) => (<option value={item}>{item}</option>))}
                    </select>
                </div>
            </div>

        </>
    );
}

export default Receipt;