import React, { useEffect, useState } from "react";
import { getAllClient } from "../../functions/clients";
import { IClient, IGenericObject, ISingleProps, IUtilisateur } from "../../interface/interfaces";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';



const Passagers = ({ data }: ISingleProps) => {

    const [counter, setCounter] = useState<number>(2);
    const [clients, setClients] = useState<any>([]);
    const [clientsDiv, setClientsDiv] = useState<Array<any>>([]);

    useEffect(() => {
        getClients();
        if (data) {
            setCounter(data.length);
            for (let i = 0; i < data.length; i++) {
                setClientsDiv([...clientsDiv, divClient(i)]);
            }
        }
    }, [])

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
                <Select name={"Cpassager_" + id} options={clients} defaultValue={data[id + 1] ? { value: data, label: "TEST" } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
        );
    }
    console.log(data ? { value: data[0], label: "datssaa" } : "");

    return (
        <>
            <h1 className="text-2xl  text-center border-b-2 ">Passagers</h1>

            <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Clients 1</label>
                    <Select name={"Cpassager_" + 0} options={clients} defaultValue={data ? { value: data[0], label: "dataa" } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
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