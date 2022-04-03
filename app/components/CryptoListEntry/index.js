import Image from 'next/image'
import Link from 'next/link'
import style from "./index.module.scss"

export default function CryptoListEntry(props) {
    const { name, balance } = props
    return (
        <li className={style.crypto}>
            <Link href={`/crypto/${name}`}>
                <a>
                    <Image className={style.image} src={`/images/cryptos/${name}.png`} alt={`${name} Logo`} width={50} height={50} />
                    <p className={style.name}>
                        {name}
                    </p>
                    <p className={style.balance}>
                        {balance}
                    </p>
                </a>
            </Link>
        </li>

    )
}
