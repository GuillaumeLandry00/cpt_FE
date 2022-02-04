import React, { useEffect, useState } from "react";
import { getAllClient, getClient } from "../../functions/clients";
import { IClient } from "../../interface/interfaces";
import Select from 'react-select';

type Props = {
    stateClient: string;
    dispatchClient: (val: any) => any;
    test: string;
};
const Passagers: React.FC<Props> = ({ stateClient, dispatchClient, test }) => {

    const [counter, setCounter] = useState<number>(1);
    const [clients, setClients] = useState<any>([]);
    useEffect(() => {
        getClients();
    }, [])
    const getClients = async () => {
        let clientsDirty = await getAllClient();
        let clientClean: any = [];
        clientsDirty.map((item: IClient) => {
            clientClean.push({ value: item.ID, label: item.Nom + ", " + item.Prenom });
        });
        setClients(clientClean)
    }




    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Passagers + {test}</h1>

            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 1</label>
                    <Select options={clients} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 2</label>
                    <Select options={clients} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 3</label>
                    <Select options={clients} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 4</label>
                    <Select options={clients} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <button onClick={() => { dispatchClient({ type: "add", state: stateClient }) }}>Press me</button>
                <small className="text-sm text-center underline">Veuillez laisser le champ vide s'il n'y pas 4 clients</small>
            </div>
        </>
    );
}

export default Passagers;