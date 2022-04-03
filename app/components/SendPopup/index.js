import style from "./index.module.scss"
import { useState } from 'react'
import Close from "/public/images/svg/close.svg"
import Send from "/public/images/svg/send.svg"

export default function SendPopUp(props) {
    const { crypto, updateCrypto, authToken } = props

    const [value, setValue] = useState("")
    const [receiverWallet, setReceiverWallet] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [errors, setErrors] = useState("")

    const toggleVisibility = (e) => {
        e.preventDefault()
        setVisibility(!visibility)
    }

    const sendTransaction = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch(`/api/users/transaction`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    crypto,
                    value,
                    transactionType: "sent",
                    receiverWallet
                })
            })
            res = await res.json()
            if (res.error) {
                setErrors(res.error)
            } else {
                res.transactions = res.transactions.reverse()
                setErrors("")
                setVisibility(false)
                updateCrypto(res)
            }
        } catch (error) {
            console.log(error)
            setErrors(error.error)
        }
    }

    return (
        <div className={style.popup}>
            {visibility && <div className={style.form}>
                <form onSubmit={(e) => sendTransaction(e)}>
                    <div className={style.close} onClick={(e) => toggleVisibility(e)}>
                        <Close />
                    </div>
                    <div style={{ marginBottom: "1em" }}>
                        <label>Receiver</label>
                        <input required onChange={(e) => setReceiverWallet(e.target.value)} type="text" name="receiver" />
                    </div>
                    <div style={{ marginBottom: "1em" }}>
                        <label>Amount</label>
                        <input required onChange={(e) => setValue(e.target.value)} type="number" name="value" />
                    </div>

                    {errors && <p className={style.errors}>{errors}</p>}
                    <button className={style.button}><Send />Send</button>
                </form>
            </div>}
            <button className={style.button} onClick={(e) => toggleVisibility(e)}><Send />Send</button>
        </div>
    )
}
