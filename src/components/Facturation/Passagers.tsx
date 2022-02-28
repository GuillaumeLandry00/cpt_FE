import React, { useEffect, useState } from "react";
import { getAllClient } from "../../functions/clients";
import { IClient, IGenericObject, ISingleProps, IUtilisateur } from "../../interface/interfaces";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';



const Passagers = ({ data }: any) => {

    const [counter, setCounter] = useState<number>(2);
    const [clients, setClients] = useState<any>([]);
    const [clientsDiv, setClientsDiv] = useState<Array<any>>([]);



    useEffect(() => {
        getClients();
    }, [])

    useEffect(() => {
        if (data != undefined) {
            setCounter(data.length);
            for (let i = 1; i < data.length; i++) {
                clientsDiv[i] = divClient(i);
            }
        }
    }, [data])

    const getClients = async () => {
        let clientsDirty = await getAllClient();
        let clientClean: any = [];
        clientsDirty.map((item: IClient) => {
            clientClean.push({ value: item.ID, label: item.Nom + ", " + item.Prenom });
        });
        setClients(clientClean)
    }



    /**
     * This function help addin a client to the form
     */
    const handleAddClient = (action: string): void => {
        if (action === "add") {
            if (counter < 13) {
                setCounter(counter + 1);
                setClientsDiv([...clientsDiv, divClient(counter)]);
            }

        } else {
            if (counter > 2) {
                setCounter(counter - 1);
                let newArray: Array<any> = clientsDiv;
                newArray.pop();
                setClientsDiv([...newArray]);
            }
        }
    }



    //Component
    const divClient = (id: number,) => {
        return (

            <div key={id} className="w-full md:w-1/4 px-3 mb-6 md:mb-0">

                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients {counter}</label>
                {/* We set up a default value if needed it */}
                <Select name={"Cpassager_" + id} options={clients} defaultValue={data && data.length - 1 >= id ? { label: data[id].label, value: data[id].value } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
        );
    }

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Passagers</h1>

            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 1</label>
                    <Select name={"Cpassager_" + 0} options={clients} value={data ? { label: data[0].label, value: data[0].value } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                {clientsDiv.map((item: any) => { return item })}
            </div>
            <div className="mt-2">
                <button onClick={() => { ; handleAddClient("remove") }}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => { handleAddClient("add") }}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>

        </>
    );

}


export default Passagers;