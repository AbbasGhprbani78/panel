"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Cart.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import CartItem from '@/components/module/CartItem/CartItem'
import { MdOutlineDone } from "react-icons/md";
import { MdOutlinePrint } from "react-icons/md";
import Input from '@/components/module/Input/Input'
import StatusProduct from '@/components/module/StatusProdcut/StatusProduct'
import CartItemM from '@/components/module/CartItemM/CartItemM'
export default function Cart() {

    const [showModal, setShowModal] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [value, setValue] = useState("")

    const finalconfirmhandler = () => {
        setIsConfirmation(true)
    }



    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])


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
                        {
                            isConfirmation &&
                            <div className={`${styles.status}`}>
                                <StatusProduct />
                            </div>
                        }
                        {
                            windowWidth < 600 ?
                                <>
                                    <div className={`${isConfirmation ? styles.cartItemMwrapperactive : styles.cartItemMwrapper}`}>
                                        <div className={styles.scrollitem}>
                                            <CartItemM />
                                            <CartItemM />
                                            <CartItemM />
                                            <CartItemM />
                                            <CartItemM />
                                        </div>
                                        <div className={styles.finalbtnwapper}>
                                            <button className={`${isConfirmation ? styles.printbtn : styles.finalbtn}`} onClick={finalconfirmhandler}>
                                                {
                                                    isConfirmation ?
                                                        <span>چاپ درخواست</span> :
                                                        <span>تایید نهایی</span>
                                                }
                                                {
                                                    isConfirmation ?

                                                        < MdOutlinePrint style={{ marginRight: "15px" }} /> :
                                                        <MdOutlineDone style={{ marginRight: "15px" }} />
                                                }

                                            </button>
                                        </div>
                                    </div>
                                </> :

                                <>
                                    <div className={`${isConfirmation ? styles.cartItemMwrapperactive : styles.cartItemMwrapper}`}>
                                        <div className={styles.carts}>
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                            <CartItem setShowModal={setShowModal} isConfirmation={isConfirmation} />
                                        </div>
                                        <div className={styles.finalbtnwapper}>
                                            <button className={`${isConfirmation ? styles.printbtn : styles.finalbtn}`} onClick={finalconfirmhandler}>
                                                {
                                                    isConfirmation ?
                                                        <span>چاپ درخواست</span> :
                                                        <span>تایید نهایی</span>
                                                }
                                                {
                                                    isConfirmation ?

                                                        < MdOutlinePrint style={{ marginRight: "15px" }} /> :
                                                        <MdOutlineDone style={{ marginRight: "15px" }} />
                                                }

                                            </button>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
