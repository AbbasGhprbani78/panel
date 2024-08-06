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

import ModalDelete from '@/components/module/ModalDelete/ModalDelete'
import ModalBuy from '@/components/module/ModalBuy/ModalBuy'

export default function Cart() {

    const [showModalBuy, setShowModalBuy] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")


    const finalconfirmhandler = () => {
        setIsConfirmation(true)
    }

    // const showDeleteModal = () => {
    //     setShowModalBuy(true)
    //     setIsDeleteodal(true)
    // }


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

                    <ModalBuy showModalBuy={showModalBuy} setShowModalBuy={setShowModalBuy} value={value} setValue={setValue} />
                    <ModalDelete showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                    <Header title={"سبد خرید"} />
                    <div className={styles.maincontent}>
                        {
                            windowWidth < 600 ?
                                <>
                                    <div className={styles.contnetcratwarpperm}>
                                        <div>
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
                                        </div>
                                        <div className={`${styles.scrollitem}`}>
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
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}
                                            />
                                            <CartItem
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}
                                            />
                                            <CartItem
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}
                                            />
                                            <CartItem
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}
                                            />
                                            <CartItem
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}

                                            />
                                            <CartItem
                                                setShowModalBuy={setShowModalBuy}
                                                isConfirmation={isConfirmation}
                                                setShowDeleteModal={setShowDeleteModal}

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


// app/get/products