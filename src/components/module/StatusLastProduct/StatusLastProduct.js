"use client"
import React, { useEffect, useState } from 'react'
import styles from './StatusLastProduct.module.css'
export default function StatusLastProduct() {

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
    };

    const handlePrev = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };


    // useEffect(() => {
    //     if (currentStep === 1) {
    //         setContent("اطلاعات اولیه مشتری :")
    //     }
    //     else if (currentStep === 2) {
    //         setContent("اطلاعات اولیه خودرو")
    //     }
    // }, [currentStep])

    return (
        <div className={styles.statusproduct}>
            <p className={styles.statustext}>وضعیت آخرین سفارش</p>
            <div className={`${styles.pragresswrapper} d-flex justify-content-between`} style={{ direction: "ltr" }}>
                <div className={`${styles.pragressContainer}`}>
                    <div className={styles.progress} style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
                    <div style={{ position: "relative" }} className={`${styles.circle} ${currentStep >= 1 ? `${styles.active}` : ''}`}>
                        1
                        <p className={styles.itemprogtext}>اطلاعات مشتری</p>
                    </div>
                    <div className={`${styles.circle} ${currentStep >= 2 ? `${styles.active}` : ''}`}>
                        2
                        <p className={styles.itemprogtext}>اطلاعات خودرو</p>
                    </div>
                    <div className={`${styles.circle} ${currentStep >= 3 ? `${styles.active}` : ''}`}>
                        3
                        <p className={styles.itemprogtext}>اطلاعات خودرو</p>
                    </div>
                    <div className={`${styles.circle} ${currentStep >= 4 ? `${styles.active}` : ''}`}>
                        4
                        <p className={styles.itemprogtext}>اطلاعات خودرو</p>
                    </div>
                </div>


                {/* <button className="btn" id="Prev" onClick={handlePrev} disabled={currentStep === 1}>
                Prev
            </button>
            <button className="btn" id="Next" onClick={handleNext} disabled={currentStep === 4}>
                Next
            </button> */}
            </div>
        </div>
    )
}
