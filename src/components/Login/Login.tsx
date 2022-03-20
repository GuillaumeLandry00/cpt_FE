import React, { useState, useEffect, useRef } from "react";
import { checkLoginStatus } from "../../functions/authentification";
import { useNavigate } from "react-router-dom"

const Login = () => {

    //We initialize data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData]: Array<any> = useState("");
    const [err, setErr] = useState("");
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
                navigate("/dashboard")
            } else {
                setErr(data['message']);
            }
        }

    }, [data])

    return (
        <div className="w-full pt-32 from-red-600 to-red-200 bg-gradient-to-b h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4 ml-auto mr-auto">
                <img src="https://www.voyagesgabymsh.ca/wp-content/uploads/2019/07/ctww.jpg" className="max-h-24 ml-auto mr-auto" alt="logo" />
                {url.searchParams.get("token_failed") && (<span className="text-rose-600 text-center font-bold"> Le token a expiré, veuillez vous reconnecter</span>)}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Courriel :</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        pattern="[^ @]*@[^ @]*"
                        className="shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline focus:shadow-outline"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
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
                <p className="text-rose-600 text-center mb-2">{err}</p>
                <div className="flex items-center justify-between">
                    <input className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-full" type="submit" onClick={async (e) => { e.preventDefault(); setData(await checkLoginStatus(email, password)) }} value="Me connecter" />
                </div>
            </form>
        </div>

    );
}

export default Login;