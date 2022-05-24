import React, { useState, useEffect } from "react";
import { formatDate, getWhoWork } from "../../functions/calendar";
import { IGenericObject } from "../../interface/interfaces";

type Props = {
    selectedDate: Date,
    events: any
};

const TimeLine = ({ selectedDate, events }: Props) => {

    const [whoWork, setWhoWork] = useState<Array<Array<string>>>();

    useEffect(() => {
        if (events) setWhoWork(getWhoWork(events, selectedDate));
    }, [selectedDate])


    return (
        <>
            {whoWork ? (
                <ol className="border-l border-gray-300">
                    <li>
                        <div className="flex flex-start items-center pt-3">
                            <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                            <p className="text-gray-500 text-sm">{formatDate(selectedDate, "/")}</p>
                        </div>
                        <div className="mt-0.5 ml-4 mb-6">
                            <h4 className="text-gray-800 font-semibold text-xl mb-1.5"> 8AM-11PM </h4>
                            {whoWork[0].length > 0 ? (
                                <>
                                    {whoWork[0].map((item, index) => <p className="text-gray-500 mb-3">{item}</p>)}
                                </>)
                                : (<p className="text-gray-500 mb-3">Aucune Personne</p>)}
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-start items-center pt-2">
                            <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                            <p className="text-gray-500 text-sm">{formatDate(selectedDate, "/")}</p>
                        </div>
                        <div className="mt-0.5 ml-4 mb-6">
                            <h4 className="text-gray-800 font-semibold text-xl mb-1.5">11AM-18PM</h4>
                            {whoWork[1].length > 0 ? (
                                <>
                                    {whoWork[1].map((item, index) => <p>{item}</p>)}
                                </>)
                                : (<p className="text-gray-500 mb-3">Aucune Personne</p>)}
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-start items-center pt-2">
                            <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                            <p className="text-gray-500 text-sm">{formatDate(selectedDate, "/")}</p>
                        </div>
                        <div className="mt-0.5 ml-4 pb-5">
                            <h4 className="text-gray-800 font-semibold text-xl mb-1.5">18PM-23PM</h4>
                            {whoWork[2].length > 0 ? (
                                <>
                                    {whoWork[2].map((item, index) => <p>{item}</p>)}
                                </>)
                                : (<p className="text-gray-500 mb-3">Aucune Personne</p>)}
                        </div>
                    </li>
                </ol>
            ) : (<p>Veuillez selectionner une journée</p>)}
        </>
    );
}

export default TimeLine;