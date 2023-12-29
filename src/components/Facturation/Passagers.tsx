import React, { useEffect, useState } from "react";
import { capitalizeString, getAllClient } from "../../functions/agent/clients";
import { IClient, IGenericObject, ISelect, ISingleProps, IUtilisateur } from "../../interface/interfaces";
import Select from 'react-select';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import ModalClient from "../ClientC/ModalClient";
import { Utility } from "../../functions/util/Utility";

const Passagers = ({ data }: any) => {

    const [counter, setCounter] = useState<number>(1);
    // const [clients, setClients] = useState<any>([]);
    const [clientsDiv, setClientsDiv] = useState<Array<any>>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<string>();
    let clients: any = JSON.parse(String(localStorage.getItem("clientsCache")));

    //First off, we go fetch all the clients from the DB
    useEffect(() => {
        // const fetchClients = async () => { await getClients() }
        // fetchClients();
        init();
    }, [])

    useEffect(() => {
        console.log(data);

        setDefaultValues()
    }, [data])



    const init = async (first = true) => {
        //Fetch all the clients
        // if (first) await getClients()

        //Add the divs.
        if (clients.length > 0) {
            const url: URL = new URL(window.location.href);
            //Add the first passager for a new receipt
            if (!(url.searchParams.get("id") && (url.searchParams.get("action") == "edit" || url.searchParams.get("action") == "view"))) {
                setClientsDiv([divClient(0)])
            }
        }



    }

    const setDefaultValues = async () => {
        if (data && data.length > 0) {
            setCounter(data.length);
            if (data.length == 1) {
                setClientsDiv([divClient(0)])
            } else {
                for (let i = 0; i < data.length; i++) {
                    clientsDiv[i] = divClient(i);
                }
            }
        }
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
            if (counter > 1) {
                setCounter(counter - 1);
                let newArray: Array<any> = clientsDiv;
                newArray.pop();
                setClientsDiv([...newArray]);
            }
        }
    }

    //Component
    const divClient = (id: number) => {
        //Set the default value
        let currentData = { nom: "", id: "0" };

        if (data[id]) {
            if (Utility.isJsonString(data[id])) {
                currentData = JSON.parse(data[id]);
            } else {
                currentData = data[id];
            }

        }
        console.log("The clients ?", clients);

        return (
            <div key={id} className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Client {id + 1}</label>
                {/* We set up a default value if needed it */}
                <div className="flex row">
                    <Select name={"Cpassager_" + id} options={clients} defaultValue={currentData.nom ? { label: capitalizeString(currentData.nom), value: JSON.stringify(currentData).toString() } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <button onClick={() => {
                        if ((document.getElementsByName("Cpassager_" + id)[0] as HTMLFormElement).value) {
                            setId(JSON.parse((document.getElementsByName("Cpassager_" + id)[0] as HTMLFormElement).value).id);
                            setShowModal(true);
                        } else if (parseInt(currentData.id) > 0) {
                            setId(currentData.id);
                            setShowModal(true);
                        }
                    }}>
                        <AiOutlineInfoCircle size={22} color={"rgb(31 41 55)"} />
                    </button>

                </div>

            </div>
        );
    }

    return (
        <>
            {(showModal && id) && <ModalClient setShowModal={setShowModal} id={id} />}
            <h1 className="text-2xl  text-center border-b-2 ">Passagers</h1>

            <div className="flex flex-wrap -mx-3 mt-2">
                {clientsDiv.map((item: any) => { return item })
                }

            </div>
            <div className="mt-2">
                <button onClick={() => { ; handleAddClient("rem ove") }}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => { handleAddClient("add") }}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>

        </>
    );

}


export default Passagers;