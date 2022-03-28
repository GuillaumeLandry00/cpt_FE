import React, { useState } from "react";
import { SITE_URL } from "../../constants/constantes";
import { changePassword } from "../../functions/authentification";

const ChangePassword = () => {

    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const url = new URL(window.location.href);

    const handleClick = async () => {
        setErr("")
        if (password == passwordConfirm) {
            const response = await changePassword(password, url.searchParams.get("refresh_token") as string);
            if (!response.name) {
                window.location.href = SITE_URL + "?password_changed=true";
            } else {
                setErr("Il y a eu une erreur, veuillez demander un nouveau lien de réinitialisation");
            }

        } else {
            setErr("Les mots de passe ne concordent pas");
        }
    }


    return (
        <div className="">

            {err && (<p className="text-rose-600 text-center font-bold">{err}</p>)}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Mot de passe :</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    className="shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline focus:shadow-outline"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Confirmer le mot de passe :</label>
                <input
                    name="password"
                    type="password"
                    value={passwordConfirm}
                    className="shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline focus:shadow-outline"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </div>
            <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 mb-4 px-4 rounded focus:outline-none focus:shadow-outline  w-full" onClick={(evt) => { evt.preventDefault(); handleClick() }}>Changer le mot de passe</button>
            <a href={SITE_URL} className="mt-10 underline">Revenir en arrière</a>
        </div>
    );
}

export default ChangePassword;