import React, { useState, useEffect, useRef } from "react";
import { checkLoginStatus, sendPasswordResetToken } from "../../functions/agent/authentification";
import { Link, useNavigate } from "react-router-dom"
import ChangePassword from "./ChangePassword";
import { SITE_URL } from "../../constants/constantes";

const Login = () => {

    //We initialize data
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [data, setData]: Array<any> = useState("");
    const [err, setErr] = useState<string>("");
    const [lostPassword, setLostPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const url = new URL(window.location.href);

    useEffect(() => {

        //We verify if the user is already logged
        if (localStorage.getItem("token")) {
            navigate("/dashboard")
        }

        if (data) {

            if (data.code === 200) {
                //We register the token
                localStorage.setItem("token", data.token);
                localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
                window.location.href = `${SITE_URL}dashboard`
            } else {
                setErr(data['message']);
            }
        }

    }, [data])

    return (
        <div className="w-full pt-32 from-blue-600 to-blue-200 bg-gradient-to-b h-screen">

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4 ml-auto mr-auto" onSubmit={(e) => { e.preventDefault() }}>
                <img src="https://www.voyagesgabymsh.ca/wp-content/uploads/2022/08/new-logo.png" className="h-23 w-48 ml-auto mr-auto" alt="logo" />
                {url.searchParams.get("token_failed") && (<span className="text-rose-600 text-center font-bold"> Le token a expiré, veuillez vous reconnecter</span>)}
                {url.searchParams.get("password_changed") && (<span className="text-green-600 text-center font-bold">Le mot de passe a bien été changé</span>)}
                {!url.searchParams.get("refresh_token") ? (<>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Courriel :</label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            pattern="[^ @]*@[^ @]*"
                            className="shadow appearance-none border border-blue-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline focus:shadow-outline"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {!lostPassword && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Mot de passe :</label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                className="shadow appearance-none border border-blue-600 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline focus:shadow-outline"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <p className="text-yellow-600 text-center">{err}</p>
                    <button className="text-gray-700 text-sm underline mb-4" onClick={() => { setErr(""); !lostPassword ? setLostPassword(true) : setLostPassword(false) }}>{!lostPassword ? "Mot de passe oublié" : "Me connecter"}</button>
                    <div className="flex items-center justify-between">
                        <input className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-full" type="submit" onClick={async (e) => {
                            e.preventDefault();
                            if (email == "") return setErr("Veuillez entrer un courriel")
                            !lostPassword ?
                                (setData(await checkLoginStatus(email, password)))
                                : (await sendPasswordResetToken(email)) ? setErr("Un courriel vous a été envoyé") : setErr("Erreur, veuillez ressayer")
                        }} value={lostPassword ? "Envoyer le lien de réinitialisation" : "Me connecter"} />
                    </div>
                </>) : (<ChangePassword />)}
            </div>
            {/* 
            
            */}
        </div>

    );
}

export default Login;