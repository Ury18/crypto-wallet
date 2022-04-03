import Cookie from "js-cookie"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from "../app/middleware/parseCookies"
import Layout from '/app/components/Layout'
import Header from '/app/components/Header'
import CryptoList from "/app/components/CryptoList"
import style from '/styles/Home.module.scss'

export default function Home(props) {
  const router = useRouter()
  const { authToken, cryptoList } = props

  useEffect(() => {
    if (!authToken) {
      Cookie.remove("authToken")
      router.push("/login")
    }
  }, [])


  return (
    <Layout>
      <Header />
      <h1 className={style.title}>My cryptos</h1>
      {cryptoList && <CryptoList cryptos={cryptoList} />}
    </Layout>
  )
}


export async function getServerSideProps(ctx) {
  let cookie = parseCookies(ctx.req)
  try {
    let res = await fetch(`${process.env.API_URL}/users`,
      {
        headers: {
          authorization: `Bearer ${cookie.authToken}`
        }
      })

    res = await res.json()
    if (res.error) throw Error(res.error)
    return { props: { authToken: cookie.authToken, cryptoList: res.cryptos } }

  } catch {
    return { props: { authToken: null } }
  }
}
