import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { REMARKS } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";
import { OPC_RATE } from "../../constants/constantes";

const OpcRemarks = ({ data, opcAmount }: ISingleProps) => {

    const [counter, setCounter] = useState<number>(0);
    const [opcDiv, setOpcDiv] = useState<Array<any>>([]);
    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
            setOpcDiv([divOpc(0)])
        }
    }, [])

    //This help deal with default values
    useEffect(() => {
        if (data != undefined) {
            setCounter(data.length);
            let newArr = new Array(data.length);

            setOpcDiv([divOpc(0)])
        }
    }, [data])

    const divOpc = (id: number) => {
        return (
            <div key={id} className="flex flex-wrap -mx-3 mt-2">

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 1</label>
                    <Select name="Oopc_remarque1" options={REMARKS} defaultValue={data ? { label: data.opc_remarque1, value: data.opc_remarque1 } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 2</label>
                    <Select name="Oopc_remarque_2" options={REMARKS} defaultValue={data ? { label: data.opc_remarque_2, value: data.opc_remarque_2 } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
            </div>
        )
    }

    console.log("AMOUNT OPC", opcAmount);

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Sommaire *OPC / Remarques</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Opc</label>
                    <input type="text" name={"Oopc"} value={opcAmount ? opcAmount * OPC_RATE : 0} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Grand total</label>
                    <input type="text" name={`Ogrand_total`} value={opcAmount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                    <input type="text" name="Oopc_notes" defaultValue={data ? data.opc_not : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                {opcDiv.map((item) => { return item })}
            </div>

        </>
    );

}


export default OpcRemarks;