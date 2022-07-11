
import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import { IGenericObject } from "../../interface/interfaces";

type props = {
    search: string,
    setSearch: (search: string) => void,
    fetch: () => Promise<void>,
}

const SearchBar = ({ search, setSearch, fetch }: props) => {
    return (
        <div className="pt-2 relative mx-auto text-gray-600" >
            <input onKeyDown={(e) => e.key === 'Enter' ? fetch() : ""} id="searchInput" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="rechercher" placeholder="Rechercher par nom" onChange={(e) => setSearch(e.target.value)} value={search} />
            <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={() => fetch()}>
                <FcSearch size={28} />
            </button>
        </div>
    );
}

export default SearchBar;