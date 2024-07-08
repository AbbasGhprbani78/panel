"use client"
import React, { useState } from 'react'
import styles from './StatusProduct.module.css'
import { IoBagAddOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BsBox2 } from "react-icons/bs";

export default function StatusProduct({ style }) {
  const [currentStep, setCurrentStep] = useState(3);

 
  return (

    <div className={`${styles.pragresswrapper} d-flex justify-content-between`} style={{ direction: "ltr" }}>
      <div className={`${styles.progressc} ${styles[style]}`}>
        <div className={`${styles.pragressContainer}`}>
          <div className={styles.progress} style={{ width: `${(currentStep - 1) * 20}%` }}></div>
          <div style={{ position: "relative" }}
            className={`${styles.circle} ${currentStep >= 1 ? `${styles.active}` : ''}`}>
            <IoBagAddOutline className={`${styles.iconstatus} ${currentStep >= 1 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>صدور سفارش</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 2 ? `${styles.active}` : ''}`}>
            <MdOutlineShoppingCartCheckout className={`${styles.iconstatus} ${currentStep >= 2 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>تایید فروش</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 3 ? `${styles.active}` : ''}`}>
            <IoMdDoneAll className={`${styles.iconstatus} ${currentStep >= 3 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>تایید نهایی</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 4 ? `${styles.active}` : ''}`}>
            <FiTruck className={`${styles.iconstatus} ${currentStep >= 4 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>در حال ارسال</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 5 ? `${styles.active}` : ''}`}>
            <HiOutlineNewspaper className={`${styles.iconstatus} ${currentStep >= 5 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>مختومه</p>
          </div>
          <div className={`${styles.circle} ${currentStep >= 6 ? `${styles.active}` : ''}`}>
            <BsBox2 className={`${styles.iconstatus} ${currentStep >= 6 ? `${styles.activeicon}` : ''}`} />
            <p className={styles.itemprogtext}>کامل ارسال شده</p>
          </div>
        </div>
      </div>
    </div>
  )
}
