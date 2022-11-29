import React, { useState, useEffect } from "react";
import { getSuppliers } from "../../../functions/admin/supplier";
import { Utility } from "../../../functions/util/Utility";
import { IOpc, IProducts } from "../../../interface/interface_accounting";
import { ISupplier } from "../../../interface/interface_admin";
import InnerTableAdminSupp from "../../Admin/Supplier/InnerTableAdminSupp";
import SearchBar from "../../Others/SearchBar";

type props = {
    setShowModal: (showModal: boolean) => void,
    products: IProducts[],
    opc: IOpc | null
}
const ModalExpenses = ({ setShowModal, products, opc }: props) => {


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
                                Ajustement de commission
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
                            <form action="">
                                <div className="border-2 w-96  p-2 rounded-lg flex-row flex mb-5">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold  mt-5 mr-4">Date ajustement</label>
                                    <input type="date" name="Fdate" className="appearance-none block w-3/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Select a date" data-mdb-toggle="datepicker" defaultValue={new Date().toISOString().substring(0, 10)} required />
                                </div>
                                <div className="w-full flex flex-row">
                                    <fieldset className="w-1/3 border border-solid border-gray-300 pl-4 pr-4 pt-2 pb-2 flex flex-row justify-around rounded-lg shadow-2xl h-min">
                                        <legend className="ml-24 font-bold">CLIENT &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; CAD</legend>

                                        <div >
                                            <p className="text-m font-bold">Client</p>
                                            <p className="text-sm mb-1">QUANTITÉ</p>
                                            <p className="text-sm mb-1">PRIX</p>
                                            <p className="text-sm mb-1">TAXE</p>
                                            <p className="text-sm mb-1">FRAIS</p>
                                            <p className="text-sm mb-1">TPS</p>
                                            <p className="text-sm mb-1">TVQ</p>
                                            <p className="text-sm mb-1">TOTAL</p>
                                        </div>
                                        <div >
                                            <p className="text-m font-bold">Cad</p>
                                            <p className="text-sm mb-1">{products[0].qty}</p>
                                            <p className="text-sm mb-1">{products[0].prix}</p>
                                            <p className="text-sm mb-1">{products[0].taxe}</p>
                                            <p className="text-sm mb-1">frais</p>
                                            <p className="text-sm mb-1">{products[0].produit_tps}</p>
                                            <p className="text-sm mb-1">{products[0].produit_tvq}</p>
                                            <p className="text-sm mb-1 font-bold">{products[0].total}</p>
                                        </div>

                                    </fieldset>
                                    <div className="w-1/3 pl-4 pr-4 flex flex-col justify-around h-min">
                                        <fieldset className="w-full border border-solid border-gray-300 pt-2 pb-2 flex flex-row justify-around rounded-lg shadow-2xl h-min">
                                            <legend className="ml-5 font-bold">COMMISSION - AVANTCAD</legend>
                                            <div className=" ">
                                                <p className="text-m font-bold">TYPE</p>
                                                <p className="text-sm mb-1">VALEUR (PAR PASS)</p>
                                                <p className="text-sm mb-1">PROVINCE</p>
                                                <p className="text-sm mb-1">TPS</p>
                                                <p className="text-sm mb-1">TVQ</p>
                                                <p className="text-sm mb-1">COMMISION</p>
                                                <p className="text-sm mb-1">PROFIT</p>                                            </div>
                                            <div>
                                                <p className="text-m font-bold">{products[0].type_comm}</p>
                                                <p className="text-sm mb-1">{products[0].comm}</p>
                                                <p className="text-sm mb-1">Québec</p>
                                                <p className="text-sm mb-1">{Utility.roundNumber(Utility.calcComm(products[0].type_comm, products[0].comm, products[0].total) * 0.05)}</p>
                                                <p className="text-sm mb-1">{Utility.roundNumber(Utility.calcComm(products[0].type_comm, products[0].comm, products[0].total) * 0.099750)}</p>
                                                <p className="text-sm mb-1">{Utility.calcComm(products[0].type_comm, products[0].comm, products[0].total)}</p>
                                                <p className="text-sm mb-1 font-bold">{Utility.calcComm(products[0].type_comm, products[0].comm, products[0].total)}</p>
                                            </div>
                                        </fieldset>
                                        <fieldset className="w-full border border-solid border-gray-300 pt-2 pb-2 flex flex-row justify-around rounded-lg shadow-2xl mt-10">
                                            <legend className="ml-5 font-bold">FOURNISSEUR - AVANTCAD</legend>
                                            <div className=" ">
                                                <p className="text-sm mb-1">ACHATS NET</p>
                                                <p className="text-sm mb-1">DÉPÔT</p>
                                                <p className="text-sm mb-1">FINAL</p>

                                            </div>
                                            <div>
                                                <p className="text-sm mb-1">{opc ? (opc.grand_total ? opc.grand_total : products[0].total) : ""}</p>
                                                <p className="text-sm mb-1">0.00</p>
                                                <p className="text-sm mb-1">0.00</p>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="w-1/3 pl-4 pr-4 flex flex-col justify-around h-min">


                                        <fieldset className="w-full border border-solid border-gray-300 pt-2 pb-2 flex flex-row justify-around rounded-lg shadow-2xl">
                                            <legend className="ml-5 font-bold">COMMISSION - APRÈSCAD</legend>
                                            <div className=" ">
                                                <p className="text-sm mb-3 py-1">TYPE</p>
                                                <p className="text-sm mb-3 py-1">VALEUR</p>
                                                <p className="text-sm mb-3 py-1">PROVINCE</p>
                                                <p className="text-sm mb-3 py-1">TPS</p>
                                                <p className="text-sm mb-3 py-1">TVQ</p>
                                                <p className="text-sm  py-1">COMMISION</p>
                                                <p className="text-sm py-1">PROFIT</p>
                                            </div>
                                            <div>
                                                <div className="relative">
                                                    <select name={`type`} className="block appearance-none w-full  bg-gray-200 border mb-3 border-gray-500 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                        <option value="%">%</option>
                                                        <option value="%">Montant</option>
                                                        <option value="%">NET</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                                <input name={`valeur`} className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Valeur" />
                                                <div className="relative">
                                                    <select name={`province`} className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                        <option value="quebec" selected>Québec</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                                <input name={`tps`} className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Tps" />
                                                <input name={`tvq`} className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Tvq" />


                                                <p className="text-sm py-1">0.00</p>
                                                <p className="text-sm py-1">0.00</p>
                                            </div>
                                        </fieldset>
                                        <fieldset className="w-full border border-solid border-gray-300 pt-2 pb-2 flex flex-row justify-around rounded-lg shadow-2xl h-min mt-10">
                                            <legend className="ml-5 font-bold">FOURNISSEUR - APRÈSCAD</legend>
                                            <div className=" ">
                                                <p className="text-m">ACHATS NET</p>
                                                <p className="text-sm mb-1">DÉPÔT</p>
                                                <p className="text-sm mb-1">FINAL</p>

                                            </div>
                                            <div>
                                                <p className="text-m">{opc ? (opc.grand_total ? opc.grand_total : products[0].total) : ""}</p>
                                                <p className="text-sm mb-1">0.00</p>
                                                <p className="text-sm mb-1">0.00</p>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>

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
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalExpenses;