import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss'

const Layout = ((props) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>Uri's Crypto Wallet</title>
                <meta name="description" content="Uri's Crypto Wallet" />
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            <main className={styles.main}>
            {props.children}
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/images/svg/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
})

export default Layout
