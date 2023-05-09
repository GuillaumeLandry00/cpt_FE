import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCronTask, getCronTask, ICronTask } from "../../functions/agent/email";
import { MdOutlineDeleteForever } from 'react-icons/md';

const CronTable = ({ utilisateur }: any) => {

    const [data, setData] = useState<Array<ICronTask>>([]);


    //Make the api request and get all task in table
    useEffect(() => {
        const getData = async () => {
            setData([...await getCronTask(utilisateur.email)]);
        };
        getData();
    }, [])


    return (
        <div className="w-2/4 ml-auto shadow-2xl mt-11 bg-slate-100 p-6 mr-auto">
            <h1 className="font-bold text-xl text-left">Mes tâches programmées</h1>
            {data.length > 0 ? (
                <>
                    <table className="w-full h-full shadow-m mt-8">
                        <thead className="bg-gray-800 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-2/6">
                                    Date d'envoi
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-2/6">
                                    Courriel client
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-2/6">
                                    Objet
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left w-2/6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((task, index) =>
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{task.sending_date.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{task.to}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{task.object}</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => { deleteCronTask(task.ID) }}>
                                            <MdOutlineDeleteForever size={22} className="ml-4" color='red' />
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                </>) : (
                <h1>Vous n'avez pas de tâches prévues</h1>
            )}
        </div>
    );
}

export default CronTable;