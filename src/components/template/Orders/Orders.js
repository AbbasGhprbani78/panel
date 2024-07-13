"use client"
import Header from '@/components/module/Header/Header'
import OrderItem from '@/components/module/OrderItem/OrderItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import SideBar from '@/components/module/SideBar/SideBar'
import styles from '@/styles/Orders.module.css'
import React, { useState } from 'react'

export default function Orders() {

    const [searchValue, setSearchValue] = useState("")
    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"سفارشات"} />
                <div className={styles.maincontent2}>
                    <div className={styles.searchwrapper}>
                        <SearchBox
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className={styles.orderitemcontainer}>
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                        <OrderItem date={"2024/2/23"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
