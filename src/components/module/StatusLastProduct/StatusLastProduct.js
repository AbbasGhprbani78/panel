
import React from 'react'
import styles from './StatusLastProduct.module.css'
import StatusProduct from '../StatusProdcut/StatusProduct';
import Link from 'next/link';
export default function StatusLastProduct() {


    return (
        <div className={styles.statusproduct}>
            <p className={styles.statustext}>وضعیت آخرین سفارش</p>
            <StatusProduct style={"paddingstyle"}/>
            <div className={styles.statusproductbottom}>
                <div className={styles.orderdeatil}>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تعداد سفارش :</span>
                        <span className={styles.orderdetailtext}>100 عدد </span>
                    </div>
                    <div className={styles.orderdetailitem}>
                        <span className={styles.orderdetailtitle}>تاریخ سفارش :</span>
                        <span className={styles.orderdetailtext}>01/02/23</span>
                    </div>
                </div>
                <Link href={"/orders"} className={styles.historybtn}>تاریخچه</Link>
            </div>
        </div>
    )
}
