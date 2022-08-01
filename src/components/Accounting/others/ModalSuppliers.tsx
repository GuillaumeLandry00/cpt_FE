import React, { useState, useEffect } from "react";
import { getSuppliers } from "../../../functions/admin/supplier";
import { ISupplier } from "../../../interface/interface_admin";
import InnerTableAdminSupp from "../../Admin/Supplier/InnerTableAdminSupp";
import SearchBar from "../../Others/SearchBar";

type props = {
    setShowModal: (showModal: boolean) => void,
    setSupplier: (supplier: string) => void,
    multiSelect: boolean,
    type: string
}
const ModalSuppliers = ({ setShowModal, setSupplier, multiSelect, type }: props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ISupplier[]>([]);
    const [search, setSearch] = useState<string>("");

    //We fetch data for administrative purchases
    const fetch = async (limit: number = 15, offset: number = 0): Promise<void> => {
        setIsLoading(true);
        setData(await getSuppliers(search, limit, offset, type) as ISupplier[]);
        setIsLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [])


    return (
        <>
            <div
                className="justify-center top-20 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 mx-auto w-3/5">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Fournisseur {type == "admin" ? "Administratif" : "Voyage"}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <SearchBar search={search} setSearch={setSearch} fetch={fetch} />
                            <InnerTableAdminSupp suppliers={data} setSupplier={setSupplier} setShowModal={setShowModal} multiSelect={multiSelect} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                            <button
                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalSuppliers;