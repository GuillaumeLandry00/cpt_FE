import React, { useEffect, useState, } from "react";
import { capitalizeString, deleteClient, getAllClient, getClientSearch } from "../../functions/clients";
import { Link } from "react-router-dom";

//The icons
import { FcEditImage } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';

import { IClient } from "../../interface/interfaces";


const Table = () => {

    const [data, setData] = useState<IClient[]>([]);
    const [search, setSearch] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number>(0);
    const url = new URL(window.location.href);


    //Make the api request
    const getData = async () => {
        if (search == "") {
            setData([...await getAllClient()]);
        } else {
            setData([...await getClientSearch(search)]);
        }


    };

    //Make the request when the component is created
    useEffect(() => {
        getData();
    }, [])

    console.log(showModal);


    return (<>


        <div className="w-4/5 mb-28 overscroll-auto  ml-auto mr-auto ">
            <p className="ml-auto text-right mt-5">
                <Link to="form/" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    Ajouter un client
                </Link>
            </p>
            <h2 className="text-center mt-8 font-bold text-xl">Liste de mes clients {url.searchParams.get("deleted") == "true" && (<span className="text-green-500 font-semibold text-lg">Client supprimé</span>)} {url.searchParams.get("deleted") == "false" && (<span className="text-red-500 font-semibold text-lg">Il y a eu une erreur, veuillez ressayer</span>)}</h2>

            <div className="pt-2 relative mx-auto text-gray-600" >
                <input onKeyDown={(e) => e.key === 'Enter' ? getData() : ""} id="searchInput" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="rechercher" placeholder="Rechercher par nom & prénom" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={() => getData()}>
                    <FcSearch size={28} />
                </button>
            </div>
            {showModal ? (
                <div className="fade fixed top-100 translate-x-2/4 w-2/5 outline-none">
                    <div className="modal-dialog relative w-auto">
                        <div className="modal-content shadow-lg relative flex flex-col w-full bg-slate-200 bg-clip-padding rounded-md outline-none text-current">
                            <div
                                className="modal-header flex items-center justify-between p-4 rounded-t-md">
                                <h5 className="text-xl font-medium leading-normal text-gray-800 text-center ml-auto mr-auto" >
                                    Désirez-vous supprimer ce client ?
                                </h5>

                            </div>
                            <div className="relative p-4">
                                <div className="flex flex-shrink-0 flex-wrap items-center p-4 justify-around rounded-b-md">
                                    <button
                                        onClick={() => { setShowModal(false); }}
                                        className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >Non, revenir en arrière
                                    </button>
                                    <button onClick={() => { setShowModal(true); deleteClient(clientId) }} className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Oui, je confirme</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ""}

            <table className="w-full h-full shadow-2xl mt-8">
                <thead className="bg-gray-800 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Nom
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Prenom
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Adresse
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((client, index) =>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{client.ID}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{capitalizeString(client.Nom)}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{capitalizeString(client.Prenom)}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{client.Adresse}</td>
                            <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                <Link to={`view/?id=${client.ID}`}>
                                    <GrFormView size={22} color="grey" />
                                </Link>
                                <Link to={`form/?action=edit&id=${client.ID}`}>
                                    <FcEditImage size={22} className="ml-3" />
                                </Link>
                                <button onClick={() => {
                                    setShowModal(true); setClientId(client.ID)
                                }}>
                                    <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                </button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);
}

export default Table;