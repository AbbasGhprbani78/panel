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
    const [isDeleteModal, setIsDeleteodal] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const hideModal = () => {
        setIsDeleteodal(false)
        setShowModal(false)
    }

    const finalconfirmhandler = () => {
        setIsConfirmation(true)
    }

    const showDeleteModal = () => {
        setShowModal(true)
        setIsDeleteodal(true)
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
            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <div className={`${styles.modalcontainer} ${showModal ? styles.showmodal : ""}`}>
                        <div className={styles.modalhide} onClick={hideModal}></div>
                        <div className={styles.modalwrapper}>

                            {isDeleteModal &&
                                <div className={styles.modaldelete}>
                                    <div>
                                        <span>از حذف محصول اطمینان دارید ؟</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-4">
                                        <button className={`${styles.ysebtn} ${styles.aciondelete}`}>بله</button>
                                        <button className={`${styles.nobtn} ${styles.aciondelete}`} onClick={hideModal}>خیر</button>
                                    </div>
                                </div>
                            }

                            {
                                !isDeleteModal && showModal &&
                                <>
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
                                </>
                            }
                        </div>
                    </div>
                    <Header title={"سبد خرید"} />
                    <div className={styles.maincontent}>
                        {
                            windowWidth < 600 ?
                                <>
                                    <div className={styles.contnetcratwarpperm}>
                                        <SearchBox
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        {
                                            isConfirmation &&
                                            <div className={`${styles.status}`}>
                                                <StatusProduct style={"paddingstyle"} />
                                            </div>
                                        }
                                        <div className={styles.cartItemMwrapper}>
                                            <div className={styles.scrollitem}>
                                                <CartItemM showDeleteModal={showDeleteModal} isConfirmation={isConfirmation} />
                                                <CartItemM showDeleteModal={showDeleteModal} isConfirmation={isConfirmation} />
                                                <CartItemM showDeleteModal={showDeleteModal} isConfirmation={isConfirmation} />
                                                <CartItemM showDeleteModal={showDeleteModal} isConfirmation={isConfirmation} />
                                                <CartItemM showDeleteModal={showDeleteModal} isConfirmation={isConfirmation} />
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
                                    </div>
                                </> :

                                <>
                                    <div className={`${styles.cartItemwrapper}`}>
                                        <div className={styles.wrapper}>
                                            <SearchBox
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                        </div>
                                        {
                                            isConfirmation &&
                                            <div className={`${styles.status}`}>
                                                <StatusProduct />
                                            </div>
                                        }
                                        <div className={styles.carts}>
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <CartItem
                                                setShowEditModal={setShowModal}
                                                isConfirmation={isConfirmation}
                                                showDeleteModal={showDeleteModal}
                                            />
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
            </div >
        </>
    )
}
