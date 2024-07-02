import React from 'react'
import styles from '@/styles/Home.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import Infouser from '@/components/module/Infouser/Infouser'
import Notifications from '@/components/module/Notifications/Notifications'
import Chart from '@/components/module/Chart/Chart'
import StatusLastProduct from '@/components/module/StatusLastProduct/StatusLastProduct'
export default function Home() {
    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header />
                <div className={styles.maincontent}>
                    <div className={styles.hometop}>
                        {/* <Infouser /> */}
                        {/* <Notifications /> */}
                        {/* <Chart /> */}
                        <StatusLastProduct />

                    </div>
                </div>
            </div>
        </div>
    )
}
