import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
interface Props {
    switchViews: (viewsa: string) => void,
}


const AccountingTopBar = ({ switchViews }: Props) => {

    return (
        <div className="w-full h-16 bg-gray-800 ">
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <button className="hover:bg-gray-700 text-white  pl-2 ml-1 py-2 rounded-md text-m font-xl font-bold" onClick={() => switchViews("")} >
                        Navigation Comptabilité
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 ml-5 rounded-md text-sm font-medium inline-block" onClick={() => switchViews("comptes-payables")}>
                        <MdAttachMoney size={28} className="float-left border rounded-full p-1" /><span className="pl-2">Comptes Payables</span>
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 ml-5 rounded-md text-sm font-medium inline-block" onClick={() => switchViews("achats-emis")}>
                        <GiReceiveMoney size={28} className="float-left border rounded-full p-1" /> <span className="pl-2">Comptes Recevables</span>
                    </ button>
                </div>
            </div>
        </div >
    );
}

export default AccountingTopBar;