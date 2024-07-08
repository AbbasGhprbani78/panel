"use client"
import React, { useState } from 'react'
import styles from './OrderTrackItem.module.css'
import { IoBagAddOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BsBox2 } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";

export default function OrderTrackItem() {
    const [currentStep, setCurrentStep] = useState(7);
    return (
        <div className={styles.ordertrackitemwrappper}>
            <div className={styles.ordertrackdetail}>
                <div className={styles.rightdetail}>
                    <span className={styles.titlebold}>سفارش 1</span>
                    <div className={styles.reqnumberwrapper} style={{ marginRight: "30px" }}>
                        <span className={styles.titlebold}>شماره درخواست :</span>
                        <span style={{ marginRight: "10px" }}>1525164</span>
                    </div>
                </div>
                <div className={styles.leftdetail}>
                    <div className={`${styles.numberorder} mx-5`}>
                        <span style={{ marginLeft: "15px" }}>تعداد سفارش :</span>
                        <span>100 عدد </span>
                    </div>
                    <div>
                        <span style={{ marginLeft: "15px" }}>تاریخ سفارش :</span>
                        <span>01/02/23</span>
                    </div>
                </div>
            </div>
            <div className={`${styles.mapstatus} mt-4`}>
                <button className={styles.detailbtn}>
                    جزئیات
                </button>
                <div className={styles.wrapper} style={{ direction: "ltr" }}>
                    <div className={`${styles.progressc}`}>
                        <div className={`${styles.pragressContainer}`}>
                            <div className={styles.progress} style={{ width: `${(currentStep - 1) * 14.28}%` }}></div>
                            <div className={`${styles.circle} ${currentStep >= 1 ? `${styles.active}` : ''}`}>
                                <FaWpforms className={`${styles.iconstatus} ${currentStep >= 1 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>صدور درخواست</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 2 ? `${styles.active}` : ''}`}>
                                <AiOutlineFileDone className={`${styles.iconstatus} ${currentStep >= 2 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>تایید درخواست</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 3 ? `${styles.active}` : ''}`}>
                                <IoBagAddOutline className={`${styles.iconstatus} ${currentStep >= 3 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>صدور سفارش</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 4 ? `${styles.active}` : ''}`}>
                                <MdOutlineShoppingCartCheckout className={`${styles.iconstatus} ${currentStep >= 4 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>تایید فروش</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 5 ? `${styles.active}` : ''}`}>
                                <IoMdDoneAll className={`${styles.iconstatus} ${currentStep >= 5 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>تایید نهایی</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 6 ? `${styles.active}` : ''}`}>
                                <FiTruck className={`${styles.iconstatus} ${currentStep >= 6 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>در حال ارسال</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 7 ? `${styles.active}` : ''}`}>
                                <BsBox2 className={`${styles.iconstatus} ${currentStep >= 7 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>کامل ارسال شده</p>
                            </div>
                            <div className={`${styles.circle} ${currentStep >= 8 ? `${styles.active}` : ''}`}>
                                <HiOutlineNewspaper className={`${styles.iconstatus} ${currentStep >= 8 ? `${styles.activeicon}` : ''}`} />
                                <p className={styles.itemprogtext}>مختومه</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
