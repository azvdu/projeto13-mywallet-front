import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css"

export default function Wallet({user}){
    console.log(user.token)
    const [transactions, setTransactions] = useState({})
    return(
        <div className="wallet">
            <Header name={user.name}/>
            <ListTransactions token={user.token} transactions={transactions} setTransactions={setTransactions} />
            <NewTransaction />
        </div>
    )
}

function Header({name}){
    const navigate = useNavigate()
    function logOff(){
        navigate('/')
    }
    return(
        <div className="header">
            <h1>Olá, {name}</h1>
            <ion-icon name="log-out-outline" onClick={() => logOff()} ></ion-icon>
        </div>
    )
}

function ListTransactions({token, transactions, setTransactions}){
    useEffect(() => {
        const url = "http://localhost:5000/wallet"
        const config = {
            headers: {
                token: token
            }
        }
        const promise = axios.get(url, config)
        promise.then( response => {
            const {data} = response
            setTransactions(data)
            console.log(response)
        })
        promise.catch( err => {
            console.log(`Erro ${err.response.status}, ${err.data.message}`)
        })
    }, [])

    let saldo = 0
    if(transactions.length > 0){
        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].type === "gain"){
                saldo += Number(transactions[i].value)
            } else{
                saldo -= Number(transactions[i].value)
            }
        }
        console.log(saldo)
    }
    return(
        <>
            {transactions.length > 0 ?
                <div className="listTransactions">
                    <div className="listTransactionsTop">
                        {transactions.map(transaction => <Transactions date={transaction.date} description={transaction.description} value={transaction.value}    type={transaction.type} key={transaction._id} />)}
                    </div>
                    <div className="listTransactionsBottom">
                        <div className="saldo">SALDO</div>
                        {saldo >= 0 ?
                            <div className="valorTotal gain"> {Number(saldo/100).toFixed(2)} </div> :
                            <div className="valorTotal exit"> {Number(saldo/100).toFixed(2)} </div>
                        }
                    </div>
                </div> :
                <div className="listTransactions">
                    <div className="empty">
                        Não há registros de<br/> 
                        entrada ou saída
                    </div>
                </div>
            }

        </>
    )
}

function Transactions({date, description, value, type}){
    return(
        <div className="transaction">
            <div className="date">{date}</div>
            <div className="description">{description}</div>
            {type === "gain" ?
                <div className="gain">{ value < 100 ? Number(value).toFixed(2) : Number(value/100).toFixed(2)}</div> :
                <div className="exit">{ value < 100 ? Number(value).toFixed(2) : Number(value/100).toFixed(2)}</div>
            }
        </div>
    )
}

function NewTransaction(){
    return(
        <div className="newTransaction">
            <NewGain />
            <NewExit />
        </div>
    )
}

function NewGain(){
    const navigate = useNavigate()
    return(
        <button onClick={() => navigate("/gain")}>
                <ion-icon name="add-circle-outline"></ion-icon>
                Nova<br/>
                entrada
        </button>
    )
}

function NewExit(){
    const navigate = useNavigate()
    return(
        <button onClick={() => navigate("/exit")}>
            <ion-icon name="remove-circle-outline"></ion-icon>
            Nova<br/>
            saída
        </button>
    )
}