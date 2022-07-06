import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { IGenericObject } from "../../interface/interfaces";

type props = {
    offset: number,
    setOffset: (int: number) => void,
    getData: (position: number, offset: number) => void,
    setIsLoading: (isLoading: boolean) => void,
    data: IGenericObject | undefined
}

const BottomBarList = ({ offset, setOffset, setIsLoading, getData, data }: props) => {
    return (
        <div className="w-full flex justify-content">
            {offset > 0 ? <button className="ml-auto mr-auto mt-10 font-semibold underline text-l" onClick={() => { setOffset(offset - 25); setIsLoading(true); getData(25, offset - 25); }}><BiChevronsLeft size={25} className={"float-left"} /> Page précédente</button> : ""}
            {data && data.length > 0 ? <button className="ml-auto mr-auto mt-10 font-semibold underline text-l " onClick={() => { setOffset(offset + 25); setIsLoading(true); getData(25, offset + 25); }}>Page suivante <BiChevronsRight className={"float-right"} size={25} /></button> : ""}
        </div>
    );
}

export default BottomBarList;