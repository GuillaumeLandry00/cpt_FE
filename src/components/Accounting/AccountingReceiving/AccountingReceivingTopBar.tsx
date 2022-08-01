import React from "react";


interface Props {
    switchViews: (viewsa: string) => void,
}


const AccountingTopBar = ({ switchViews }: Props) => {

    return (
        <div className="w-full h-14 bg-gray-800 ">
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("achats-administratifs")}>
                        • Achats administatifs
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("achats-emis")}>
                        • Achats émis
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("fonds-indemnisation")}>
                        • Fonds d'indemnisation
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("paiements-taxe")}>
                        • Paiements de taxes
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("debourses-admin")}>
                        • Déboursés admin
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("debourses-voyages")}>
                        • Déboursés voyages
                    </ button>

                </div>
            </div>
        </div >
    );
}

export default AccountingTopBar;