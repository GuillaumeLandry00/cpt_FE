import React, { useEffect, useState, } from "react";
import { getReceipts } from "../../functions/receipt";
import { Link } from "react-router-dom";

//The icons
import { FcEditImage } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';
import { IReceipt } from "../../interface/interfaces";

const TableReceipt = () => {

    const [data, setData] = useState<IReceipt[]>([]);
    const [search, setSearch] = useState<string>("");


    //Make the api request
    const getData = async () => {
        if (search == "") {
            setData([...await getReceipts()]);
        } else {
            setData([...await getReceipts(search)]);
        }

        console.log([...await getReceipts()])
    };

    //Make the request when the component is created
    useEffect(() => {
        getData();
    }, [])


    return (<>
        <div className="w-4/5 mb-28 overscroll-auto  ml-auto mr-auto ">
            <h2 className="text-center mt-8">Liste de mes clients</h2>
            <div className="pt-2 relative mx-auto text-gray-600" >
                <input onKeyDown={(e) => e.key === 'Enter' ? getData() : ""} id="searchInput" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="rechercher" placeholder="Rechercher un dossier" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={() => getData()}>
                    <FcSearch size={28} />
                </button>
            </div>

            <table className="w-full h-full shadow-2xl mt-8">
                <thead className="bg-gray-800 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Date
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Nom  client
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((receipt, index) =>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.dossier_no}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{receipt.date}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{receipt.nom}</td>
                            <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                <Link to={`form/?id=${receipt.facturationID}`}>
                                    <GrFormView size={22} color="grey" />
                                </Link>
                                <Link to={`form/?action=edit&id=${receipt.facturationID}`}>
                                    <FcEditImage size={22} className="ml-3" />
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);
}

export default TableReceipt;