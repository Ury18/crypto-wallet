import Cookie from "js-cookie"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from "/app/middleware/parseCookies"
import Layout from '/app/components/Layout'
import Header from '/app/components/Header'
import TransactionsList from "/app/components/TransactionsList"
import SendPopUp from "/app/components/SendPopup"

export default function Crypto(props) {
    const router = useRouter()
    const { authToken } = props
    const [crypto, setCrypto] = useState(props.crypto)

    useEffect(() => {
        if (!authToken && !crypto) {
            Cookie.remove("authToken")
            router.push("/login")
        }
        if (!crypto) router.push("/")
    }, [])

    return (
        <Layout>
            <Header backButton="/"/>
            <SendPopUp crypto={crypto.name} updateCrypto={setCrypto} authToken={authToken}/>
            {crypto && <TransactionsList transactions={crypto.transactions} name={crypto.name} />}
        </Layout>
    )
}


export async function getServerSideProps(ctx) {
    let cookie = parseCookies(ctx.req)
    let crypto = null
    try {
        let res = await fetch(`${process.env.API_URL}/users`,
            {
                headers: {
                    authorization: `Bearer ${cookie.authToken}`
                }
            })

        res = await res.json()
        if (res.error) throw Error(res.error)

        let cryptoIndex = res.cryptos.findIndex((element) => element.name == ctx.query.name)

        if (cryptoIndex !== -1) crypto = res.cryptos[cryptoIndex]
        crypto.transactions = crypto.transactions.reverse()
        return { props: { authToken: cookie.authToken, crypto } }

    } catch {
        return { props: { authToken: null, crypto } }
    }
}
