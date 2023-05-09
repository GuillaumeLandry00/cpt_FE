import React, { useEffect, useState } from "react";
import { getAgent, updateAgent } from "../../../functions/admin/agent";
import { IUtilisateur } from "../../../interface/interfaces";
import { BiArrowBack } from "react-icons/bi";

interface Props {
    switchViews: (views: string) => void,
    id: string,
}


const EditAgent = ({ id, switchViews }: Props) => {

    const fetchAgents = async (): Promise<void> => {
        let agent = await getAgent(parseInt(id))
        setAgents(agent);

        //We set default values
        setUserType(agent.user_type);
        setComm(agent.comm);
        setAgences(agent.agences)

        setIsLoading(false);
    }

    useEffect(() => {
        fetchAgents();
    }, [])

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [agents, setAgents] = useState<IUtilisateur>();

    const [userType, setUserType] = useState<number>(0);
    const [comm, setComm] = useState<number>(0);
    const [agences, setAgences] = useState<string>("");

    const [response, setResponse] = useState<string>("");

    const update = async () => {
        if ((await updateAgent({ user_type: userType, comm: comm, agence: agences }, parseInt(id))).affectedRows > 0) {
            setResponse("Agent modifié");
        }
    }

    return (
        <div className="w-full">
            <button className="mb-10" onClick={() => { switchViews("agents") }}>
                <BiArrowBack size={34} />
            </button>

            <h1 className="text-2xl border-b-2">Formulaire agent: {agents?.nomComplet} {response && (<span className="text-green-500">{response}</span>)}</h1>
            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <>
                    <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                        <div className="flex flex-wrap -mx-3 mb-2">
                            {/* Gender */}
                            <div className="w-1/6 md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Type Utilisateur
                                </label>
                                <div className="relative">
                                    <select onChange={(e) => setUserType(parseInt(e.target.value))} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                        <option value={0}>Agent</option>
                                        <option value={1}>Admin</option>

                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Comm</label>
                                    <input type="number"
                                        onChange={(e) => setComm(parseInt(e.target.value))}
                                        value={comm}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="Comm" />

                                </div>
                            </div>
                            <div className="w-1/6 md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Agence
                                </label>
                                <div className="relative">
                                    <select onChange={(e) => setAgences(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                        <option value={"bsp cwt"}>BSP & CWT</option>
                                        <option value={"cwt"}>CWT</option>
                                        <option value={"bsp"}>BSP</option>

                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                            </div>
                            <div className="w-1/6 md:w-1/4 mt-6">
                                <button type="button" onClick={() => { update(); }} className=" appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Modifier</button>
                            </div>
                        </div>
                    </form>
                </>
            )}

        </div >
    );
}

export default EditAgent;

function agentUpdate() {
    throw new Error("Function not implemented.");
}
