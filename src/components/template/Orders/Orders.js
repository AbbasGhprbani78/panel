"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Orders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderItem from '@/components/module/OrderItem/OrderItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import axios from 'axios'

export default function Orders({ id }) {
    const [search, setSearch] = useState("")
    const [orderDetails, setOrderDetails] = useState([])


    const getOrderDetails = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/get-product/${id}`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
                setOrderDetails(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.removeItem("refresh")
                localStorage.removeItem("access")
                router.push("/login")
            }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getOrderDetails()
    }, [])


    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"سفارشات"} />

                <div className={styles.ordertitlewrapper}>
                    <div className={styles.detailorderwrapper}>
                        <span>تاریخ سفارش :</span>
                        <span>{formatDate(orderDetails[0]?.product?.date)}</span>
                    </div>
                    <SearchBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.maincontent}>
                    <div className={styles.orderitemcontainer}>
                        {
                            orderDetails.length > 0 ?
                                orderDetails.map(item => (
                                    < OrderItem key={item.product.id}
                                        item={item}
                                    />
                                )) :
                                <>

                                </>
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}
