import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Wallet from "../Wallet/Wallet"
import Transaction from "../Transaction/Transaction"

import "./reset.css"
import "./styles.css"

export default function App(){
    let user = {
        token: "",
        name: "",
    }

    return(
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<SignIn user={user}/>}/>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/wallet" element={<Wallet user={user}/>} />
                <Route path="/:transaction" element={<Transaction user={user}/>} />
            </Routes>
        </BrowserRouter>
    )
}