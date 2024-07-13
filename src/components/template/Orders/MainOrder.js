"use client"
import React, { useState } from 'react'
import styles from '@/styles/Orders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderItem from '@/components/module/OrderItem/OrderItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'

export default function MainOrder() {
    const [search, setSearch] = useState("")

    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"سفارشات"} />

                <div className={styles.ordertitlewrapper}>
                    <div className={styles.detailorderwrapper}>
                        <span>تاریخ سفارش :</span>
                        <span>01/02/23</span>
                    </div>
                    <SearchBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.maincontent}>
                    <div className={styles.orderitemcontainer}>
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                    </div>
                </div>
            </div>
        </div>
    )
}
