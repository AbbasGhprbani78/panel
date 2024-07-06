import React from 'react'
import styles from './InfoUser.module.css'
import { CiUser } from "react-icons/ci";
export default function Infouser({ setShowModal }) {
    return (
        <div className={styles.infouserwrapper}>
            <div className={styles.infousertop}>
                <div className={styles.iconwrapper}>
                    <CiUser className={styles.iconuser} />
                </div>
                <p className={styles.userfullname}>عباس قربانی</p>
            </div>
            <div className={styles.userabout}>
                <div className={styles.useraboutitem}>
                    <span className={styles.userabouttitle}>شماره تماس :</span>
                    <span className={styles.useraboutsub}>09123456789</span>
                </div>
                <div className={styles.useraboutitem}>
                    <span className={styles.userabouttitle}>ایمیل :</span>
                    <span className={styles.useraboutsub}>email@gmail.com</span>
                </div>
                <div className={styles.useraboutitem}>
                    <span className={styles.userabouttitle}>آدرس :</span>
                    <span className={styles.useraboutsub}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</span>
                </div>
            </div>
            <div className={styles.btnwrapper}>
                <button className={styles.btnedituser} onClick={() => setShowModal(true)}>
                    ویرایش
                </button>
            </div>
        </div>
    )
}
