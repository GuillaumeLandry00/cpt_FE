import React, { useEffect, useState } from "react";
import { ORIGINE } from "../../constants/select_constants";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';


const Itinerary = () => {


    //Component
    const divItineraries = (id: number) => {

        //Correct useState bug
        let currentID = id + 1;

        return (
            <>
                <div key={id} className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Origine</label>
                        <Select name={`Iorigin_${currentID}`} options={ORIGINE} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Destination</label>
                        <Select name={`Idestination_${currentID}`} options={ORIGINE} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cie</label>
                        <input name={`Icie_${currentID}`} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Vol no</label>
                        <input name={`Ivol_no_${currentID}`} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Classe</label>
                        <input name={`Iclasse_${currentID}`} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Départ</label>
                        <input type="date"
                            name={`Idate_depart_${currentID}`}
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input name={`Idepart_hh_${currentID}`} type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" name={`Idepart_mm_${currentID}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Arrivé</label>
                        <input type="date"
                            name={`Iarrive_${currentID}`}

                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input type="number" name={`Iarrive_hh_${currentID}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" name={`Iarrive_mm_${currentID}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                        <input type="text" name={`Iitineraire_note_${currentID}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
            </>
        );
    }

    const handleClick = (action: string): void => {
        if (action === "add") {
            if (counter < 12) {

                setItinerariesDiv([...itinerariesDiv, divItineraries(counter)]);
                setCounter(counter + 1);
            }
        } else {
            if (counter > 2) {
                setCounter(counter - 1);
                let newArray: Array<any> = itinerariesDiv;
                newArray.pop();
                setItinerariesDiv([...newArray]);
            }
        }
    }

    const [counter, setCounter] = useState<number>(0);
    const [itinerariesDiv, setItinerariesDiv] = useState<Array<any>>([divItineraries(-1)]);

    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Itineraire du voyage</h1>
            {itinerariesDiv.map((item) => { return item })}
            <div className="mt-2">
                <button onClick={() => { handleClick("remove"); }}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => { handleClick("add") }}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>
        </>
    );
}

export default Itinerary;