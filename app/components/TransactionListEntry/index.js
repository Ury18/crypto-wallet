import Send from "/public/images/svg/send.svg"
import Receive from "/public/images/svg/receive.svg"
import style from "./index.module.scss"

export default function TransactionListEntry(props) {
    let { name, transaction_type, value, date } = props
    date = new Date(date)

    let Icon = transaction_type == "received" ? Receive : Send
    let transactionSign = transaction_type == "received" ? "+" : "-"

    return (
        <li className={`${style.transaction} ${style[transaction_type]}`}>
            <div className={`${style.icon}`}>
                <Icon />
            </div>
            <div className={`${style.type}`}>
                <div>
                    <p className={`${style.transaction_type_info}`}>
                        {transaction_type}
                    </p>
                    <p className={`${style.date}`}>
                        {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}
                    </p>
                </div>
            </div>
            <p className={`${style.value}`}>
                {`${transactionSign}${value} ${name}`}
            </p>
        </li>
    )
}
