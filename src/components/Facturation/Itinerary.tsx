import React, { useEffect, useState } from "react";
import { ORIGINE } from "../../constants/select_constants";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { IGenericObject } from "../../interface/interfaces";


const Itinerary = ({ data }: IGenericObject) => {

    //Samll inner component
    const divItineraries = (id: number,) => {
        return (
            <div key={id} >

                <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Origine</label>
                        <Select name={`Iorigin_${id}`} options={ORIGINE} defaultValue={data && data.length - 1 >= id ? { label: data[id].origin, value: data[id].origin } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Destination</label>
                        <Select name={`Idestination_${id}`} options={ORIGINE} defaultValue={data && data.length - 1 >= id ? { label: data[id].destination, value: data[id].destination } : ""} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cie</label>
                        <input name={`Icie_${id}`} type="text" defaultValue={data && data.length - 1 >= id ? data[id].cie : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Vol no</label>
                        <input name={`Ivol_no_${id}`} type="text" defaultValue={data && data.length - 1 >= id ? data[id].vol_no : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Classe</label>
                        <input name={`Iclasse_${id}`} type="text" defaultValue={data && data.length - 1 >= id ? data[id].classe : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Départ</label>
                        <input type="date"
                            name={`Idate_depart_${id}`}
                            defaultValue={data && data.length - 1 >= id ? data[id].date_depart : ""}
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input name={`Idepart_hh_${id}`} type="number" defaultValue={data && data.length - 1 >= id ? data[id].depart_hh : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" name={`Idepart_mm_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].depart_mm : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Arrivé</label>
                        <input type="date"
                            name={`Iarrive_${id}`}
                            defaultValue={data && data.length - 1 >= id ? data[id].arrive : ""}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input type="number" defaultValue={data && data.length - 1 >= id ? data[id].arrive_hh : ""} name={`Iarrive_hh_${id}`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" name={`Iarrive_mm_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].arrive_mm : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                        <input type="text" name={`Iitineraire_note_${id}`} defaultValue={data && data.length - 1 >= id ? data[id].itineraire_note : ""} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
            </div>
        );
    }

    const [itinerariesDiv, setItinerariesDiv] = useState<Array<any>>([]);
    const [counter, setCounter] = useState<number>(0);

    //Here we deal with react-select async problem
    useEffect(() => {
        const url: URL = new URL(window.location.href);
        if (!(url.searchParams.get("id") && url.searchParams.get("action") == "edit")) {
            setItinerariesDiv([divItineraries(0)])
        }
    }, [])




    //This help deal with default values
    useEffect(() => {
        if (data != undefined) {
            setCounter(data.length);
            let newArr = new Array(data.length);

            for (let i = 0; i < data.length; i++) {
                newArr[i] = divItineraries(i);
            }

            setItinerariesDiv([...newArr])
        }
    }, [data])


    //This will handle our click by adding new input or removing input
    const handleClick = (action: string): void => {
        if (action === "add") {
            if (counter < 12) {
                setCounter(counter + 1);
                setItinerariesDiv([...itinerariesDiv, divItineraries(counter + 1)]);
            }
        } else {
            if (counter > 0) {
                setCounter(counter - 1);
                let newArray: Array<any> = itinerariesDiv;
                newArray.pop();
                setItinerariesDiv([...newArray]);
            }
        }
    }


    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Itineraire du voyage</h1>
            {itinerariesDiv.length == 0 ? (<p className="font-bold">Veuillez ajouter une itinéraire en appuyant sur le +</p>) : ""}
            {itinerariesDiv.map((item) => { return item })}
            <div className="mt-2">
                <button onClick={() => { handleClick("remove"); }}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => { handleClick("add") }}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>
        </>
    );
}

export default Itinerary;