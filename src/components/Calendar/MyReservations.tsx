import React, { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { convertNumberToTime, deleteEvent, getEvents } from "../../functions/calendar";
import { IGenericObject, IUtilisateur } from "../../interface/interfaces";


type Props = {
    fetchEvents: () => Promise<void>,
    update: number
};


const MyReservations = ({ fetchEvents, update }: Props) => {

    const [myEvents, setMyEvents] = useState<IGenericObject>([]);
    const [response, setResponse] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //This function will go fetch data
    let fetchMyEvents = async () => {
        setIsLoading(true);
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        let myEvt = await getEvents(utilisateur.id)
        setMyEvents(myEvt);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchMyEvents();
    }, []);

    useEffect(() => {
        fetchMyEvents();
    }, [update])


    return (
        <div className="w-full mb-32">
            <h1 className="text-xl font-bold">Mes Réservations <span className="text-green-600 text-sm">{response && response}</span></h1>
            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <>
                    {myEvents.length > 0 ? (
                        <table className="w-full h-full shadow-2xl mt-2">
                            <thead className="bg-gray-800 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                        Date
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                        Temps
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {myEvents.map((event: IGenericObject, index: number) =>
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>

                                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{event.date.substr(0, 10)}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{convertNumberToTime(event.time)}</td>
                                        <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap">
                                            <button onClick={async () => {
                                                //We delete 
                                                if (await deleteEvent(event.id) > 0) {
                                                    //Object deleted..
                                                    fetchEvents();
                                                    fetchMyEvents();
                                                    setResponse("Réservation supprimée");

                                                }

                                            }}>
                                                <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                            </button>

                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (<p>Vous n'avez pas de réservations</p>)}
                </>
            )}
        </div>
    );
}

export default MyReservations;