import TransactionListEntry from '../TransactionListEntry'
import style from "./index.module.scss"

export default function TransactionsList(props) {
    let { transactions, name } = props

    const renderEntries = () => {
        let key = 0
        return transactions.map(transaction => {
            return <TransactionListEntry
                key={key++}
                transaction_type={transaction.transaction_type}
                value={transaction.value}
                date={transaction.date}
                name={name}
            />
        })
    }

    return (
        <ul className={style.list}>
            {renderEntries()}
        </ul>
    )
}
