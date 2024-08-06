import React from 'react'
import styles from './CartItemM.module.css'
import { IoCloseSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
export default function CartItemM({ showDeleteModal, isConfirmation, setShowModalBuy }) {
    return (

        <div className={styles.CartItemmwrapper}>
            <div className={styles.headercart}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <p className={styles.carttitle}>شرح محصول</p>
                    {
                        !isConfirmation &&
                        <IoCloseSharp className={styles.delete} onClick={showDeleteModal} />
                    }
                </div>
                <span className={styles.carttext}>دستگیره 8400 کروم مشکی مات سوئچی رزت</span>
            </div>
            <div className={styles.cartinfowrapper}>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>ADFG8745</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کارتن</span>
                    <span>12</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>گنجایش کارتن</span>
                    <span>12</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>مقدار</span>
                    <div className={""}>
                        <div >1</div>
                    </div>
                </div>
            </div>

            <div className='text-center d-flex justify-content-center mt-3'>
                <button className={styles.add_btn} onClick={() => setShowModalBuy(true)}>
                    <MdModeEditOutline className='mx-2' />
                    ویرایش
                </button>
            </div>
        </div>
    )
}
