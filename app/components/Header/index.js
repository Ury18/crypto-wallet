import Link from 'next/link'
import style from './index.module.scss'
import Back from '/public/images/svg/back.svg'
export default function Header(props) {

    return (
        <header className={style.header}>
            {props.backButton && <Link  href={props.backButton}>
                <a className={style.backButton}>
                    <Back />
                </a>
            </Link>}
            <h1 className={style.title}>
                Uri's Crypto Wallet
            </h1>

        </header>
    )
}
