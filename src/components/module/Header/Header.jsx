import React from 'react'
import styles from './Header.module.css'
import { GoBell } from "react-icons/go";
export default function Header() {
    return (
        <div className={styles.headercontainer}>
            <span className={styles.headertext}>خانه</span>
            <div className={styles.iconheaderwrap}>
                <GoBell className={styles.iconheader} />
            </div>
        </div>
    )
}
