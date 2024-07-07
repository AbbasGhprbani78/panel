import React from 'react'
import styles from './CartItemM.module.css'
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Col } from 'react-bootstrap';
export default function CartItemM() {
    return (

        <div className={styles.CartItemmwrapper}>
            <div className={styles.headercart}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <p className={styles.carttitle}>شرح محصول</p>
                    <IoCloseSharp className={styles.delete} />
                </div>
                <span className={styles.carttext}>دستگیره 8400 کروم مشکی مات سوئچی رزت</span>
            </div>
            <div className={styles.cartinfowrapper}>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>ADFG8745</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>ADFG8745</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>12</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>12</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <div className={styles.boxchangecount}>
                        <span className={styles.plus}>
                            <FaPlus />
                        </span>
                        <span>1</span>
                        <span className={styles.min}>
                            <FaMinus />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
