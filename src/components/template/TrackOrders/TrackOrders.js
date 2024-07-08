import React from 'react'
import styles from '@/styles/TrackOrders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderTrackItem from '@/components/module/OrderTrackItem/OrderTrackItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import Filter from '@/components/module/Filter/Filter'
export default function TrackOrders() {
    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"پیگیری سفارشات"} />
                <div className={styles.ordercontent}>
                    <div className={styles.topsec}>
                        <SearchBox />
                        <div className={styles.filtercontainer}>
                            <Filter />
                        </div>
                    </div>
                    <div className={styles.maincontent}>
                        <OrderTrackItem />
                        <OrderTrackItem />
                        <OrderTrackItem />
                        <OrderTrackItem />
                        <OrderTrackItem />
                        <OrderTrackItem />
                    </div>
                </div>
            </div>
        </div>
    )
}
