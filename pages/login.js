import Layout from '../app/components/Layout'
import Cookie from "js-cookie"
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import style from '/styles/logInPage.module.scss'
import Header from '/app/components/Header'

const LogIn = (props) => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const logIn = async (e) => {
        e.preventDefault()

        try {
            let res = await fetch(`/api/users/authenticate`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({email,password})
            })
            res = await res.json()
            if (res.error) {
                setErrors(res.error)
            } else {
                Cookie.set("authToken", res.token, { expires: 1 })
                router.push('/')
            }

        } catch ({error}) {
            setErrors(error.error)
        }

    }

    return (
        <Layout>
            <Head>
                <title>Inicia seión - Feastey</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Inicia seión - Feastey" key="title" />
                <meta name="description" content="Pagina de Inicia seión - Feastey" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="Inicia seión - Feastey" />
                <meta name="og:description" property="og:description" content="Pagina de Inicia seión - Feastey" />
                <meta property="og:site_name" content={`${process.env.HOST}`} />
            </Head>
            <Header />
            <h2 className={style.title}>Inicia sessión</h2>
            <form className={style["login-form"]} onSubmit={(e) => logIn(e)}>
                <div >
                    <label>Email</label>
                    <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                </div>
                <div style={{ marginBottom: "1em" }}>
                    <label>Contraseña</label>
                    <input required onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                </div>

                {errors && <p className={style.errors}>{errors}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </Layout>
    )
}

export default LogIn
