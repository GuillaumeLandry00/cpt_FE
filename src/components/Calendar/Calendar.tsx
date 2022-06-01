import React, { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { countAvaibality, formatDate, getEvents, addEventsDB, checkIfUserRegistred, getWhoWork } from '../../functions/calendar';
import '../../assets/css/calendar.css';
import { IGenericObject, IUtilisateur } from '../../interface/interfaces';
import MyReservations from './MyReservations';
import TimeLine from './TimeLine';

const Calendar = () => {


    let fetchEvents = async () => {
        let evt = await getEvents();
        setIsLoading(false);

        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        console.log("User event" + await getEvents(utilisateur.id));

        setEvents(evt);
    }

    useEffect(() => {
        fetchEvents();
    }, [])

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [response, setResponse] = useState("");
    const [events, setEvents] = useState<IGenericObject>();
    const [update, setUpdate] = useState<number>(0);

    if (events) console.log(countAvaibality(events, selectedDate, 2, (selectedDate.getDay() == 5 || selectedDate.getDay() == 6 || selectedDate.getDay() == 0) ? 1 : 2));



    return (
        <>
            <div className='ml-auto mr-auto w-2/3 flex mt-12 justify-between'>
                {!isLoading ? (<>
                    <div>
                        <h1 className='text-2xl font-bold mb-7'>Réservation des plages horaires</h1>
                        <ReactCalendar onChange={setSelectedDate} value={selectedDate} tileClassName={({ activeStartDate, date, view }) => {
                            if (events) {
                                let count = 0;

                                for (let i = 0; i < events.length; i++) {
                                    if (new Date(events[i].date).getTime() == date.getTime()) {
                                        count++
                                    }

                                    if (count > 5) break;
                                }

                                if (count == 0) {
                                    return ""
                                } else if (count < 6) {
                                    return "notComplete"
                                } else {
                                    return "complete"
                                }
                            }
                            console.log();

                            return ""

                        }} />
                    </div>
                    <div className='ml-10'>
                        {selectedDate && typeof events !== "undefined" ? (
                            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8" id={"myForm"} onSubmit={(ev) => { ev.preventDefault(); }}>
                                <p className='text-l font-bold mb-3'>Date: {formatDate(selectedDate, "/")}  </p>
                                <span className="text-sm font-bold" id="response">{response && response}</span>
                                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-5">Veuillez choisir votre plage horaire: </p>
                                <div className="flex ml-3">
                                    <div>
                                        <div className="form-check mb-3 bg-slate-100 p-3 rounded-lg	">
                                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeSlots" value={0} />
                                            <label className="form-check-label inline-block text-gray-800">
                                                8AM-11PM {countAvaibality(events, selectedDate, 0, 2)} Places disponibles
                                            </label>
                                        </div>
                                        <div className="form-check mb-3 bg-slate-100 p-3 rounded-lg	">
                                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeSlots" value={1} />
                                            <label className="form-check-label inline-block text-gray-800">
                                                11AM-18PM {countAvaibality(events, selectedDate, 1, 2)} Places disponibles
                                            </label>
                                        </div>
                                        <div className="form-check mb-3 bg-slate-100 p-3 rounded-lg	">
                                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeSlots" value={2} />
                                            <label className="form-check-label inline-block text-gray-800">
                                                18PM-23PM {countAvaibality(events, selectedDate, 2, (selectedDate.getDay() == 5 || selectedDate.getDay() == 6 || selectedDate.getDay() == 0) ? 1 : 2)} Places disponibles
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="mt-5 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={async () => {
                                        setIsLoading(true);
                                        let selector = document.querySelector('input[name="timeSlots"]:checked');
                                        let resText = document.getElementById("response");

                                        //We  need to check if the user is already registed for the day
                                        if (selector && resText) {


                                            if (checkIfUserRegistred(events, selectedDate)) {

                                                resText.style.color = "red";
                                                setResponse(`Vous ne pouvez pas selectionner 2 plages horraire par jour`)
                                            } else {

                                                const response = await addEventsDB(selectedDate, parseInt((selector as HTMLFormElement).value));
                                                console.log(response);

                                                //We make the rquest
                                                if (response.affectedRows) {
                                                    fetchEvents();
                                                    setUpdate(update + 1);
                                                    resText.style.color = "green";
                                                    setResponse(`Réservation ajouté`);

                                                } else {
                                                    setResponse("Erreur, veuillez resasayer");
                                                    resText.style.color = "red";
                                                }
                                            }
                                        }
                                        setIsLoading(false);
                                    }}
                                >Enregistrer ma réservation</button>
                            </form>
                        ) : (<p>Veuillez selectionner une date</p>)}
                    </div>
                    <div className='mt-4 mb-10 p-8 ml-24'>
                        <p className="text-xl font-bold">Horaire de la journée</p>
                        <TimeLine events={events} selectedDate={selectedDate} />
                    </div>
                </>) : (<>
                    <div className="w-full mt-10">
                        <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div>

                </>)}


            </div>
            <div className='ml-auto mr-auto w-2/3 flex mt-12'>
                <MyReservations fetchEvents={async () => { fetchEvents() }} update={update} />
            </div>

        </>
    );
}

export default Calendar;
