import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { REMARKS } from "../../constants/select_constants";
import { ISingleProps } from "../../interface/interfaces";
import { OPC_RATE } from "../../constants/constantes";
import { stringify } from "querystring";

const OpcRemarks = ({ data, opcAmount, grandTotal }: ISingleProps) => {

    const [counter, setCounter] = useState<number>(0);
    const [opcDiv, setOpcDiv] = useState<Array<any>>([]);
    const [opc, setOpc] = useState<string>("0");
    const [grandTot, setGrandTot] = useState<string>("0");
    const [remarks1, setRemarks1] = useState<{ value: string, label: string }>({ value: "Aucune", label: "Aucune" });
    const [remarks2, setRemarks2] = useState<{ value: string, label: string }>({ value: "Aucune", label: "Aucune" });

    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);

        // if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
        //     setOpcDiv([divOpc(0)])
        // }
    }, [])

    //This help deal with default values
    useEffect(() => {

        console.log(data);

        if (data != undefined) {
            setRemarks1({ value: data.opc_remarque1, label: data.opc_remarque1 })
            setRemarks2({ value: data.opc_remarque_2, label: data.opc_remarque_2 })

        }
        if (data.opc) {
            setOpc(data.opc);
        }
    }, [data])

    useEffect(() => {
        if (opcAmount) setOpc(String(Math.round((opcAmount * OPC_RATE + Number.EPSILON) * 100) / 100));
        if (grandTotal) setGrandTot(String((Math.round((grandTotal + (parseFloat(opc) * OPC_RATE) + Number.EPSILON) * 100) / 100)));
    }, [opcAmount, grandTotal]);

    const divOpc = (id: number) => {
        return (
            <div key={id} className="flex flex-wrap -mx-3 mt-2 w-full">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 1</label>
                    <Select name="Oopc_remarque1" placeholder={"Aucune"} options={REMARKS} defaultValue={data.opc_remarque1 ? { value: data.opc_remarque1, label: data.opc_remarque1 } : ""} className="appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 2</label>
                    <Select name="Oopc_remarque_2" options={REMARKS} placeholder={"Aucune"} defaultValue={data.opc_remarque_2 ? { value: data.opc_remarque_2, label: data.opc_remarque_2, } : ""} className="appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
            </div>
        )
    }

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Sommaire *OPC / Remarques</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Opc</label>
                    <input type="text" name={"Oopc"} id={"opc"} value={opc} onChange={(e) => setOpc(e.target.value)} defaultValue={data ? data.opc : 0} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Grand total</label>
                    <input type="text" name={`Ogrand_total`} id={"grand_total"} value={data ? data.grand_total : (grandTotal && opcAmount ? (Math.round((grandTotal + (opcAmount * OPC_RATE) + Number.EPSILON) * 100) / 100) : 0)} defaultValue={data ? data.grand_total : 0} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                    <input type="text" name="Oopc_notes" defaultValue={data ? data.opc_not : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 1</label>
                    <Select name="Oopc_remarque1" placeholder="Aucune" options={REMARKS} value={remarks1} onChange={(e) => { setRemarks1({ value: e?.value as string, label: e?.label as string }) }} className="appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 2</label>

                    <Select name="Oopc_remarque_2" placeholder="Aucune" options={REMARKS} value={remarks2} onChange={(e) => { setRemarks2({ value: e?.value as string, label: e?.label as string }) }} className="appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque personelle</label>
                    <input type="text" name="Oopc_remarque" defaultValue={data ? data.opc_remarque : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                {/* {opcDiv.map((item) => { return item })} */}
            </div>

        </>
    );

}


export default OpcRemarks;