"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/TrackOrders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderTrackItem from '@/components/module/OrderTrackItem/OrderTrackItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import Filter from '@/components/module/Filter/Filter'
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function TrackOrders() {
    const [search, setSearch] = useState("")
    const [filterValue, setFilterValue] = useState("")
    const [allOrders, setAllorders] = useState([])
    const router = useRouter()

    const getAllOrders = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/get-cart-detail/`, {
                headers,
            })

            if (response.status === 200) {
                setAllorders(response.data)

            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.removeItem("refresh")
                localStorage.removeItem("access")
                router.push("/login")
            }
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"پیگیری سفارشات"} />
                <div className={styles.ordercontent}>
                    <div className={styles.topsec}>
                        <SearchBox
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className={styles.maincontent}>
                        {
                            allOrders.length > 0 ?
                                allOrders.map((order,index) => (
                                    <OrderTrackItem 
                                        key={order.cart_id}
                                        order={order}
                                        number={index}
                                     />
                                )) :
                                <>

                                </>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}



{/* <div className={styles.filtercontainer}>
                            <Filter
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                        </div> */}

// <OrderTrackItem />
// <OrderTrackItem />
// <OrderTrackItem />
// <OrderTrackItem />
// <OrderTrackItem />
// <OrderTrackItem />