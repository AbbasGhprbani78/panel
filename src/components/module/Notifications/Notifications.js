"use client"
import React, { useEffect, useState } from 'react'
import styles from './Notifications.module.css'
import NotifItem from '../NotifItem/NotifItem'
import { FaBell } from "react-icons/fa";
import axios from 'axios';
export default function Notifications() {

    const [notifications, setNotifications] = useState([])

    const getNotifications = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/get-notif/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }



    useEffect(() => {
        getNotifications()
    }, []);

    return (
        <div className={styles.notificationwrapper}>
            <div className={styles.notificationheader}>
                <FaBell className={styles.notificon} />
                <span className={styles.notification}>اعلانات</span>
            </div>
            <div className={styles.notificationcontent}>
                {
                    notifications?.length > 0 ?
                        <>
                        </> :
                        <>
                            <p className='text-center' style={{ color: "gray" }}>اعلانی وجود ندارد</p>
                        </>

                }
                {/* <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem />
                <NotifItem /> */}
            </div>
        </div>
    )
}
