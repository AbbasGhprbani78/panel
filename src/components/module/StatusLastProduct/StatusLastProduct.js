"use client"
import React, { useEffect, useState } from 'react'
import styles from './StatusLastProduct.module.css'
import StatusProduct from '../StatusProdcut/StatusProduct';
import Link from 'next/link';
import axios from 'axios';
export default function StatusLastProduct() {
    const [product, setProduct] = useState(null);

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
            }

        } catch (e) {
            console.log(e);
            if (e.response?.status === 401) {
                localStorage.clear();
                router.push("/login");
            }
        }
    };

    useEffect(() => {
        getLastStatusProduct();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className={styles.statusproduct}>
            <p className={styles.statustext}>وضعیت آخرین سفارش</p>
            <StatusProduct style={"paddingstyle"} />
            <div className={styles.statusproductbottom}>
                <div className={styles.orderdeatil}>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تعداد سفارش :</span>
                        <span className={styles.orderdetailtext}>
                            {product?.order_details?.[0]?.number_sold}
                        </span>
                    </div>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تاریخ سفارش :</span>
                        <span className={styles.orderdetailtext}>
                            {product?.order_details?.[0]?.date ? formatDate(product.order_details[0].date) : "N/A"}
                        </span>
                    </div>
                </div>
                <Link href={"/orders"} className={styles.historybtn}>تاریخچه</Link>
            </div>
        </div>
    );
}
