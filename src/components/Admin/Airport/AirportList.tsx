import React, { useEffect, useState } from "react";
import { FcEditImage, FcSearch } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { deleteAgent, getAllAgent } from "../../../functions/admin/agent";
import { capitalizeString } from "../../../functions/agent/clients";
import { IUtilisateur } from "../../../interface/interfaces";
import axios from "axios";
import { BASE_URL } from "../../../constants/constantes";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddAirport from "./AddAirport";

interface Props {
    switchViews: (views: string, id?: string) => void,
}

interface IAirport {
    id: number,
    label: string
}

const AirportList = ({ switchViews }: Props) => {

    const fetchAirports = async (): Promise<void> => {
        setIsLoading(true)
        const airports = await axios.get(BASE_URL + "airport", { headers: { "x-access-token": localStorage.getItem('token') as string } });
        setAirports([... airports.data]);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchAirports();
    }, []);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [airports, setAirports] = useState<IAirport[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");
    

    return (
        <div className="w-full">
            <div className="flex">
                <h1 className="text-xl font-bold w-11/12">Liste des aéroports  {response && (<span className="text-green-500 text-xl">{response && response}</span>)} </h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddAirport setResponse={setResponse} fetchData={fetchAirports} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un aéroport</button>)}
            </div>
            {showModal && (
                    <div>{subViews}</div>
            )}
            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <div>
                    <table className="w-full h-full shadow-2xl mt-8">
                        <thead className="bg-gray-800 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Label
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {airports.map((airport: IAirport, index) =>
                                <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{airport.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{airport.label}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default AirportList;