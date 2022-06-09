import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { deleteAgent, getAllAgent } from "../../../functions/admin/agent";
import { capitalizeString } from "../../../functions/agent/clients";
import { IUtilisateur } from "../../../interface/interfaces";

interface Props {
    switchViews: (views: string, id?: string) => void,
}

const AgentList = ({ switchViews }: Props) => {

    const fetchAgents = async (): Promise<void> => {
        setAgents([... await getAllAgent()]);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchAgents();
    }, []);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [agents, setAgents] = useState<IUtilisateur[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [response, setResponse] = useState<string>("");

    const deleteUser = async () => {
        if ((await deleteAgent(selectedId)).affectedRows > 0) {
            setResponse("Agent supprimé");
            setShowModal(false);
            setIsLoading(true)
            fetchAgents();
        }
    }

    return (
        <div className="w-full">
            <div className="flex">
                <h1 className="text-xl font-bold w-11/12">Liste des utilisateurs  {response && (<span className="text-green-500">{response}</span>)}</h1>
                <button onClick={() => switchViews("add-agent")} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded">Ajouter un agent</button>
            </div>
            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <div>
                    {showModal ? (
                        <div className="fade mt-5 w-full  outline-none">
                            <div className="w-4/5 ml-auto mr-auto">
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
                                                <button onClick={() => { setShowModal(true); deleteUser(); }} className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Oui, je confirme</button>
                                            </div>
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
                                    Email
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Nom complet
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Rôle
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Comm
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Agences
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Dernière connexion
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map((agent: IUtilisateur, index) =>
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{agent.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{agent.email}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{capitalizeString(agent.nomComplet)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{agent.user_type == 1 ? "Admin" : "Agent"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{agent.comm}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{agent.agences}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{agent.last_login ? agent.last_login : "Ne s'est jamais connecté"}</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => switchViews("edit-agent", agent.id as string)}>
                                            <FcEditImage size={22} className="ml-3" />
                                        </button>
                                        <button onClick={() => { setSelectedId(parseInt(agent.id as string)); setShowModal(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AgentList;