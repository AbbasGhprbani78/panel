"use client"
import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import Infouser from '@/components/module/Infouser/Infouser'
import Notifications from '@/components/module/Notifications/Notifications'
import Chart from '@/components/module/Chart/Chart'
import StatusLastProduct from '@/components/module/StatusLastProduct/StatusLastProduct'
import { FaPlus } from "react-icons/fa6";
import ModalUser from '@/components/module/ModalUser/ModalUser'


export default function Home() {

    const [showModal, setShowModal] = useState(false)
    return (
        <>
            {
                showModal &&
                <ModalUser setShowModal={setShowModal} />
            }

            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <Header title={"خانه"} />
                    <div className={styles.maincontent}>
                        <div className={styles.hometop}>
                            <div className={styles.item1}>
                                <button className={styles.oderbtn}>
                                    ثبت سفارش
                                    <FaPlus className={styles.iconplus} />
                                </button>
                                <Notifications />
                            </div>
                            <div className={styles.item2}>
                                <Infouser setShowModal={setShowModal} />
                            </div>
                            <div className={styles.item3}>
                                <Chart />
                            </div>
                        </div>
                        <StatusLastProduct />
                    </div>
                </div>
            </div>
        </>

    )
}


