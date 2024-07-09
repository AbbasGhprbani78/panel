import React from 'react'
import styles from '@/styles/Orders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderItem from '@/components/module/OrderItem/OrderItem'

export default function Orders() {
    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"سفارشات"} />
                <div className={styles.maincontent}>
                    <div className={styles.ordertitlewrapper}>
                        <span>تاریخ سفارش :</span>
                        <span>01/02/23</span>
                    </div>
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
