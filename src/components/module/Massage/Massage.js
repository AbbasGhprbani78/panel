import styles from './Massage.module.css'
export default function Massage(Props) {
    return (
        <div className={`${Props.sender ? styles.MassageBoxSend : styles.MassageBoxReceive}`} >
<span>
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
</span>
        </div>
    )
}