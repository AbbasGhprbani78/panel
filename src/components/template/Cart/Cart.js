"use client"
import React, { useState } from 'react'
import styles from '@/styles/Cart.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import CartItem from '@/components/module/CartItem/CartItem'
import { MdOutlineDone } from "react-icons/md";
import Input from '@/components/module/Input/Input'
export default function Cart() {

    const [showModal, setShowModal] = useState(false)
    const [value, setValue] = useState("")
    return (
        <>
            {
                showModal &&
                <div className={styles.modalcontainer}>
                    <div className={styles.modalhide} onClick={() => setShowModal(false)}></div>
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
                                <button className={styles.btnconfirm}>
                                    تایید
                                    <MdOutlineDone style={{ marginRight: "15px" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <Header title={"سبد خرید"} />
                    <div className={styles.maincontent}>
                        <SearchBox />
                    </div>
                    <div className={styles.carts}>
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                        <CartItem setShowModal={setShowModal} />
                    </div>
                    <div className={styles.finalbtnwapper}>
                        <button className={styles.finalbtn}>
                            تایید نهایی
                            <MdOutlineDone style={{ marginRight: "15px" }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
