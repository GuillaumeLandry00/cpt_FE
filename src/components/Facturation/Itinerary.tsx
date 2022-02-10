import React, { useEffect, useState } from "react";
import { ORIGINE } from "../../constants/select_constants";
import Select from 'react-select';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

type Props = {
    stateItinerary: any,
    dispatchItinerary: (val: any) => any;
    getData: (what: string) => any;
}


const Itinerary: React.FC<Props> = ({ stateItinerary, dispatchItinerary, getData }) => {

    const [values, setValues] = useState<any>(getData("itinerary"));

    useEffect(() => {
        console.log("IN VALUES", values);
        console.log("IN VALUES 0 CIE", values.itineraries[0].cie);
    }, [values])

    //Component
    const divItineraries = (id: number, value: any) => {

        //Correct useState bug
        let currentID = id + 1;

        return (
            <>
                <div key={id} className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Origine</label>
                        <Select onChange={(e: any) => { dispatchItinerary({ type: "submit", payload: { value: e.value, id: currentID, what: "origin" } }) }} options={ORIGINE} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Destination</label>
                        <Select onChange={(e: any) => { dispatchItinerary({ type: "submit", payload: { value: e.value, id: currentID, what: "destination" } }) }} options={ORIGINE} className="block appearance-none w-full  text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cie</label>
                        <input type="text" value={value.itineraries[currentID].cie} onChange={(e: any) => { dispatchItinerary({ type: "submit", payload: { value: e.target.value, id: currentID, what: "cie" } }); console.log("we get the data...", getData("itinerary")) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Vol no</label>
                        <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Classe</label>
                        <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mt-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Départ</label>
                        <input type="date"
                            value={""} onChange={(e) => true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Arrivé</label>
                        <input type="date"
                            value={""} onChange={(e) => true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Select a date" data-mdb-toggle="datepicker" />
                    </div>
                    <div className="flex flex-wrap  mt-6 md:mb-0 md: w-1/5 ">
                        <div className="w-full md:w-1/3">
                            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={24} />
                        </div>
                        <div className="w-full md:w-4 ml-1.5 mt-1.5">H</div>
                        <div className="w-full md:w-1/3">
                            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" min={0} max={60} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <label htmlFor="" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Notes</label>
                        <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
            </>
        );
    }

    const handleClick = (action: string): void => {
        if (action === "add") {
            if (counter < 12) {

                setItinerariesDiv([...itinerariesDiv, divItineraries(counter, values)]);
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
    const [itinerariesDiv, setItinerariesDiv] = useState<Array<any>>([divItineraries(-1, values)]);

    return (
        <>
            <h1 className="text-2xl border-b-2 text-center">Itineraire du voyage</h1>
            {itinerariesDiv.map((item) => { return item })}
            <div className="mt-2">
                <button onClick={() => { if (counter > 2) dispatchItinerary({ type: "remove", state: stateItinerary }); handleClick("remove"); }}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                <button className="ml-2" onClick={() => { dispatchItinerary({ type: "add", state: stateItinerary }); handleClick("add") }}><AiOutlinePlusCircle size={28} color={"green"} /></button>
            </div>
        </>
    );
}

export default Itinerary;