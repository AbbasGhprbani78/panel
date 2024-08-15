"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Orders.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import OrderItem from '@/components/module/OrderItem/OrderItem'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import axios from 'axios'
import NoneSearch from '@/components/module/NoneSearch/NoneSearch'
import EmptyProduct from '@/components/module/EmptyProduct/EmptyProduct'

export default function Orders({ id }) {
    const [search, setSearch] = useState("")
    const [orderDetails, setOrderDetails] = useState([])
    const [filterProduct, setFilterProduct] = useState([])


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
                setFilterProduct(response.data)
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
        return date.toLocaleDateString("fa-IR");
    };


    const searchHandler = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filterProducts = orderDetails.filter(
            (product) =>
                product.product.item_code.includes(searchTerm) ||
                product.product.descriptions.toLowerCase().includes(searchTerm) ||
                product.number_sold.toString().includes(searchTerm) ||
                product.product.specifications[0].property_name.toLowerCase().includes(searchTerm)
        );

        setFilterProduct(filterProducts);
    };


    useEffect(() => {
        getOrderDetails()
    }, [])


    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"سفارشات"} />
                {
                    filterProduct.length > 0 && orderDetails.length > 0 ?
                        <>
                            <div className={styles.ordertitlewrapper}>
                                <div className={styles.detailorderwrapper}>
                                    <span>تاریخ سفارش :</span>
                                    <span>{formatDate(orderDetails[0]?.product?.date)}</span>
                                </div>
                                <SearchBox
                                    value={search}
                                    onChange={searchHandler}
                                />
                            </div>
                            <div className={styles.maincontent}>
                                <div className={styles.orderitemcontainer}>
                                    {
                                        filterProduct.length > 0 ?
                                            filterProduct.map(item => (
                                                < OrderItem key={item.product.id}
                                                    item={item}
                                                />
                                            )) :
                                            <>
                                                <NoneSearch />
                                            </>
                                    }

                                </div>
                            </div>
                        </> :
                        <>
                            <EmptyProduct />
                        </>
                }
            </div>
        </div >
    )
}
