import axios from "axios";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";

import logo from "../assets/logo.png"
import "./styles.css"

export default function SignIn({user}){
    return(
        <div className="signIn">
            <img src={logo} alt="logo" />
            <Login user={user} />
            <BotaoCadastro />
        </div>
    )
}

function Login({user}){
    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")

    const navigate = useNavigate()

    function logar(event){
       event.preventDefault();

       const requisicao = axios.post("http://localhost:5000/sign-in",{
           email: email,
           password: password
       })
       requisicao.then( response => {
           const {data} = response
           console.log("then test")
           console.log({data})
           user.token = data.token;
           user.image = data.image;
           navigate("/home")
       })
       requisicao.catch(console.log("catch test"))
    }
    return(
        <>
           <div className="login">
               <form onSubmit={logar}>
                   <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                   <input type="password" value={password} onChange={e => setPassowrd(e.target.value)} placeholder="senha" required/>

                   <button type="submit">Entrar</button>
               </form>
           </div>
        </>
    )
}

function BotaoCadastro(){
   return(
       <Link to="/sign-up">
           <div className="cadastrar">
               Não tem uma conta? Cadastre-se!
           </div>
       </Link>
   )
}