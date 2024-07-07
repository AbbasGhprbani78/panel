"use client"
import React, { useState } from 'react'
import styles from './StatusLastProduct.module.css'
import StatusProduct from '../StatusProdcut/StatusProduct';
export default function StatusLastProduct() {

    const [currentStep, setCurrentStep] = useState(3);


    return (
        <div className={styles.statusproduct}>
            <p className={styles.statustext}>وضعیت آخرین سفارش</p>
            <StatusProduct />
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
                <button className={styles.historybtn}>تاریخچه</button>
            </div>
        </div>
    )
}
