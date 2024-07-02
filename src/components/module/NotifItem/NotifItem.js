import React from 'react'
import styles from './NotifItem.module.css'
import { FaRegUser } from "react-icons/fa";
export default function NotifItem() {
    return (
        <div className={styles.notifItemwrapper}>
            <div className={styles.notifItem}>
                <div className='d-flex align-items-center'>
                    <FaRegUser />
                    <span className={styles.notiftitle}>List item</span>
                </div>
                <p className={styles.notiftext}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                </p>
            </div>
        </div>
    )
}
