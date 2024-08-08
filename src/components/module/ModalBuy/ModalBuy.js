import React from 'react'
import Input from '../Input/Input'
import styles from './Modal.module.css'
import { MdOutlineDone } from "react-icons/md";
export default function ModalBuy({
    showModalBuy,
    setShowModalBuy,
    value,
    setValue,
    addToCartHandler,
    inCart,
    updateCountProduct
}) {

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (newValue >= 0) {
            setValue(newValue);
        }
    };
    return (

        <div className={`${styles.modalcontainer} ${showModalBuy ? styles.showmodal : ""}`}>
            <div className={styles.modalhide} onClick={() => setShowModalBuy(false)}></div>
            <div className={styles.modalwrapper}>

                <div className={styles.modalheader}>
                    <span className={styles.model}>ADFG8745</span>
                    <span className={styles.name}>دستگیره 8400 کروم مشکی مات سوئچی رزت</span>
                </div>
                <div className={styles.modalcontent}>
                    <div className={styles.modaldetail}>
                        <div className='d-flex align-items-end'>
                            <Input
                                name="value"
                                label="مقدار"
                                value={value}
                                onChange={handleInputChange}
                                type="text"

                            />
                            <span className={`${styles.unit}`}>کارتن</span>
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <button className={styles.btnconfirm} onClick={() => {
                            if (inCart) {
                                updateCountProduct()
                            } else {
                                addToCartHandler()
                            }
                        }}>
                            تایید
                            <MdOutlineDone style={{ marginRight: "15px" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
