import React from 'react'
import styles from './Notifications.module.css'
import NotifItem from '../NotifItem/NotifItem'
import { FaBell } from "react-icons/fa";
export default function Notifications() {
    return (
        <div className={styles.notificationwrapper}>
            <div className={styles.notificationheader}>
                <FaBell />
                <span className={styles.notification}>اعلانات</span>
            </div>
            <div className={styles.notificationcontent}>
                <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem />
            </div>
        </div>
    )
}
