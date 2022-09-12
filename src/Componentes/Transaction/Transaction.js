import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"


import "./styles.css"

export default function Transaction({user}){
    const {transaction} = useParams()
    return(
        <div className="transactionScreen">
            <Header transaction={transaction}/>
            <CreateNewTransaction token={user.token} transaction={transaction}/>
        </div>
    )
}

function Header({transaction}){
    return(
        <div className="header">Nova {
            transaction === "gain" ? "entrada" : "saída"
        }</div>
    )
}

function CreateNewTransaction({token, transaction}){
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")

    console.log(transaction)

    const navigate = useNavigate()
    
    function create(event){
        event.preventDefault()

        let arr = []
        let formatValue = value

        if (Number(formatValue) === parseInt(Number(formatValue))) {
            formatValue = `${value}.00`
        } else if(formatValue[formatValue.length - 2] === "."){
            formatValue = `${value}0`
        }
        if(formatValue.includes(".")){
            arr = formatValue.split(".")
        } 
        
        console.log(formatValue)
        const url = "http://localhost:5000/transaction"
        const config = {
            headers: {
                token: token
            }
        }
        const promise = axios.post(url, {
            value: `${arr[0] + arr[1]}`,
            description: description,
            type: transaction
        }, config)
        promise.then( response => {
            console.log("then test")
            const {data} = response
            console.log(data)
            navigate("/wallet")
        })
        promise.catch(console.log("test catch"))
    }
    return(
        <div className="createTransaction">
            <form onSubmit={create}>
                <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Valor" required/>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" required/>

                <button type="submit">Salvar {
                    transaction === "gain" ? "entrada" : "saída"
                }</button>
            </form>
        </div>
    )
}