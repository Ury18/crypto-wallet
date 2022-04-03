import CryptoListEntry from '../CryptoListEntry'
import style from "./index.module.scss"

export default function CryptoList(props) {
    const { cryptos } = props

    const renderEntries = () => {

        return cryptos.map(crypto => {
            return <CryptoListEntry
                key={crypto.name}
                name={crypto.name}
                balance={crypto.balance}
            />
        })
    }

    return (
        <ul className={style.list}>
            {renderEntries()}
        </ul>
    )
}
