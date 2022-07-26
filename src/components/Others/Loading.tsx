

import React from "react";

const Loading = () => {
    return (
        <div className="w-full mt-10">
            <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
            <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
        </div>
    );
}

export default Loading;