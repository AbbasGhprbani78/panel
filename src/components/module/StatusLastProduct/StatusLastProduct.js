"use client"
import React, { useEffect, useState } from 'react'
import styles from './StatusLastProduct.module.css'
import StatusProduct from '../StatusProdcut/StatusProduct';
import Link from 'next/link';
import axios from 'axios';
export default function StatusLastProduct() {

    const [product, setProduct] = useState([]);
    const [allNumberSold, setAllNumberSold] = useState(0)

    const getLastStatusProduct = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`,
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/get-cart-detail/`, {
                headers,
            });

            if (response.status === 200) {
                setProduct(response.data);
                console.log(response.data)
            }

        } catch (e) {
            console.log(e);
            if (e.response?.status === 401) {
                localStorage.removeItem("refresh")
                localStorage.removeItem("access")
                router.push("/login");
            }
        }
    };

    useEffect(() => {
        getLastStatusProduct();
    }, []);



    const calcTotalNumberSold = () => {
        let number = 0;
        if (product) {
            number = product[0]?.order_details?.reduce(
                (prev, current) => prev + current.number_sold,
                0
            );
            setAllNumberSold(number);
        }

        setAllNumberSold(number);
    }

    useEffect(() => {
        calcTotalNumberSold()

    }, [product])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    return (
        <div className={styles.statusproduct}>
            <p className={styles.statustext}>وضعیت آخرین سفارش</p>
            <StatusProduct product={product[0]?.order_details[0]} />
            <div className={styles.statusproductbottom}>
                <div className={styles.orderdeatil}>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تعداد سفارش :</span>
                        <span className={styles.orderdetailtext}>
                            {allNumberSold}
                        </span>
                    </div>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تاریخ سفارش :</span>
                        <span className={styles.orderdetailtext}>
                            {product[0]?.date_time ? formatDate(product[0]?.date_time) : "N/A"}
                        </span>
                    </div>
                </div>
                <Link href={`/orders/${product[0]?.cart_id}`} className={styles.historybtn}>تاریخچه</Link>
            </div>
        </div>
    );
}
