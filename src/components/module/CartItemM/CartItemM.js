import React from 'react'
import styles from './CartItemM.module.css'
import { IoCloseSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
export default function CartItemM({ setShowDeleteModal,
    isConfirmation,
    setShowModalBuy,
    prodcut,
    setValue,
    setMainCode
}) {
    return (

        <div className={styles.CartItemmwrapper}>
            {/* <div className={styles.headercart}>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                   
                </div>
                <span className={styles.carttext}>{prodcut.description}</span>
            </div>
            <div className={styles.cartinfowrapper}>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>{prodcut.code}</span>
                </div>
                <div className={styles.cartinfoitem}>
                    <span className={styles.infoitem}>مقدار</span>
                    <div className={""}>
                        <div>{prodcut.count}</div>
                    </div>
                </div>
            </div> */}
            {
                !isConfirmation &&
                <IoCloseSharp className={styles.delete} onClick={() => {
                    setShowDeleteModal(true)
                    setMainCode(prodcut.code)
                }} />
            }

            <div className={styles.imagecart}>
                <img src={prodcut.img} alt="" className={""} />
            </div>
            <div className={`${styles.cart_item_content} mt-3`}>
                <p className={`${styles.carttext} mb-4`}>{prodcut.description}</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <span className={styles.infoitem}>کد کالا</span>
                    <span>{prodcut.code}</span>
                </div>
                <div className={`${styles.cartinfoitem} align-items-center justify-content-between  mb-4`}>
                    <span className={styles.infoitem}>مقدار</span>
                    <div>{prodcut.count}</div>
                </div>
            </div>

            <div className='text-center d-flex justify-content-center mt-3'>
                <button className={styles.add_btn} onClick={() => {
                    setValue(prodcut.count)
                    setMainCode(prodcut.code)
                    setShowModalBuy(true)
                }
                }>
                    ویرایش
                    <MdModeEditOutline className='mx-2' />
                </button>
            </div>
        </div>
    )
}
