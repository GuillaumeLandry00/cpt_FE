import React, { useEffect, useState, } from "react";
import { capitalizeString, deleteClient, getAllClient, getClientSearch } from "../../functions/agent/clients";
import { Link } from "react-router-dom";

//The icons
import { FcEditImage } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';

import { IClient } from "../../interface/interfaces";
import { AiOutlineMail } from "react-icons/ai";


const Table = () => {

    const [data, setData] = useState<IClient[]>([]);
    const [search, setSearch] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEnable, setIsEnable] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const url = new URL(window.location.href);

    const disableScrolling = (isDisabled: boolean)=>{
        if(isDisabled){
            document.body.style.removeProperty("height");
            document.body.style.removeProperty("overflow");
        }else{
            document.body.style.overflow = "hidden"
            document.body.style.height = "100%"
        }
    }

    //Make the api request
    const getData = async (limit = 25, offsetData = 0) => {
        if (search == "") {
            setData([...await getAllClient(limit, offsetData)]);

        } else {
            setData([...await getClientSearch(search)]);
        }
        setIsLoading(false);

    };

    //Make the request when the component is created
    useEffect(() => {
        getData();
    }, [])

    return (<>
        {isLoading ? (
            <div className="w-full mt-10">
                <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
            </div>) : (<>


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
                        <div className="fade fixed top-100 translate-x-2/4 w-2/5 outline-none h-2/5">
                            <div className="modal-dialog relative w-auto">
                                <div className="modal-content shadow-lg relative flex flex-col w-full bg-slate-200 bg-clip-padding rounded-md outline-none text-current">
                                    <div
                                        className="modal-header  p-4 rounded-t-md">
                                        <h5 className="text-xl font-medium leading-normal text-gray-800 text-center ml-auto mr-auto" >
                                            Désirez-vous supprimer ce client ?
                                        </h5>
                                        <p className="text-center mt-3">Il est important de noter que cette action est <strong className="text-red-500">irréversible</strong>. De plus, les factures associées à ce client seront supprimée <strong className="text-red-500">définitivement</strong></p>
                                    </div>
                                    <div className="relative p-4">
                                        <div className="flex flex-shrink-0 flex-wrap items-center p-4 justify-around rounded-b-md">
                                            <button
                                                onClick={() => { setShowModal(false);disableScrolling(true) }}
                                                className=" px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >Non, revenir en arrière
                                            </button>
                                            <button onClick={() => { setShowModal(true); deleteClient(clientId) }} className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Oui, je confirme</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                    {data.length == 0 ? (<span className="text-center font-bold text-lg">Vous n'avez pas de clients</span>) : (<>
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
                                    <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
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
                                            <Link to={`mail?to=${client.Courriel}`}>
                                                <AiOutlineMail size={22} className="ml-4" />
                                            </Link>
                                            <button onClick={() => {
                                                disableScrolling(false)
                                                setShowModal(true); setClientId(client.ID)
                                            }}>
                                                <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                            </button>

                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="w-full flex justify-content">
                            {offset > 0 ? <button className="ml-auto mr-auto mt-10 font-semibold underline text-l" onClick={() => { setOffset(offset - 25); setIsLoading(true); getData(25, offset - 25); }}>&#x21DA; Page précédente</button> : ""}
                            {data.length > 15 ? <button className="ml-auto mr-auto mt-10 font-semibold underline text-l " onClick={() => { setOffset(offset + 25); setIsLoading(true); getData(25, offset + 25); }}>Page suivante &#x21DB;</button> : ""}
                        </div>

                        {(isEnable && data.length>15) && (
                            <button className="ml-auto mr-auto mt-10 font-semibold underline text-l w-full" onClick={() => { setIsLoading(true); getData(1000); setIsEnable(false) }}>Voir tous mes clients</button>
                        )}
                    </>)}

                </div>
            </>)}
    </>);
}

export default Table;