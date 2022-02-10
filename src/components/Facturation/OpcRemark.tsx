import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { REMARKS } from "../../constants/select_constants";


const OpcRemarks = () => {


    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Sommaire *OPC / Remarques</h1>
            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Opc</label>
                    <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Grand total</label>
                    <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                    <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 1</label>
                    <Select onChange={(e: any) => { return }} options={REMARKS} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Remarque 2</label>
                    <Select onChange={(e: any) => { return }} options={REMARKS} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
            </div>
        </>
    );

}


export default OpcRemarks;