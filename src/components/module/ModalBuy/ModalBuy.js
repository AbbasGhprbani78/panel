import React from 'react'
import Input from '../Input/Input'
import styles from './Modal.module.css'
import { MdOutlineDone } from "react-icons/md";
export default function ModalBuy({ showModalBuy, setShowModalBuy, value, setValue }) {
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
                                onChange={(e) => setValue(e.target.value)}
                                type={"text"}
                            />
                            <span className={`${styles.unit}`}>کارتن</span>
                        </div>
                        <div className={styles.detailtext}>
                            <span>گنجایش کارتن :</span>
                            <span>12 عدد</span>
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <button className={styles.btnconfirm} >
                            تایید
                            <MdOutlineDone style={{ marginRight: "15px" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
