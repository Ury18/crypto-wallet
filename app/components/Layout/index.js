import Head from 'next/head'
import Image from 'next/image'
import style from './index.module.scss'

const Layout = ((props) => {
    return (
        <div className={style.layout}>
            <Head>
                <title>Uri's Crypto Wallet</title>
                <meta name="description" content="Uri's Crypto Wallet" />
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            <main className={style.main}>
            {props.children}
            </main>
        </div>
    )
})

export default Layout
