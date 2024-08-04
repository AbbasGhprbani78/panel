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
import Link from 'next/link'


export default function Home() {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <ModalUser setShowModal={setShowModal} showModal={showModal} />

            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <Header title={"خانه"} />
                    <div className={styles.maincontent}>
                        <div className={styles.hometop}>
                            <div className={styles.item1}>
                                <Link href={"/products"} className={styles.oderbtn}>
                                    ثبت سفارش
                                    <FaPlus className={styles.iconplus} />
                                </Link>
                                <Notifications />
                            </div>
                            <div className={styles.item2}>
                                <Infouser setShowModal={setShowModal} />
                            </div>
                            <div className={styles.item3}>
                                <Chart />
                            </div>
                        </div>
                        <div className='pb-4'>
                            <StatusLastProduct />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


