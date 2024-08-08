"use client"
import React, { useEffect, useState,useContext } from 'react'
import styles from '@/styles/Cart.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import CartItem from '@/components/module/CartItem/CartItem'
import { MdOutlineDone } from "react-icons/md";
import { MdOutlinePrint } from "react-icons/md";
import StatusProduct from '@/components/module/StatusProdcut/StatusProduct'
import CartItemM from '@/components/module/CartItemM/CartItemM'
import ModalDelete from '@/components/module/ModalDelete/ModalDelete'
import ModalBuy from '@/components/module/ModalBuy/ModalBuy'
import { CountContext } from '@/context/CartContext' 

export default function Cart() {

    const [showModalBuy, setShowModalBuy] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [cart, setCart] = useState([])
    const [inCart, setInCart] = useState(true)
    const [mainCode, setMainCode] = useState("")
    const { setCountProduct } = useContext(CountContext)

    const finalconfirmhandler = () => {
        setIsConfirmation(true)
    }


    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    const updateCountProduct = () => {
        const updatedCart = cart.map(product =>
            product.code === mainCode ? { ...product, count: value } : product
        );
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
        setShowModalBuy(false)
    }


    const handleDelete = () => {
        const updatedCart = cart.filter(product => product.code !== mainCode);
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
        setShowDeleteModal(false)
        const countproduct = JSON.parse(localStorage.getItem('cart')).length
        setCountProduct(countproduct)
    };



    useEffect(() => {
        let localCart = JSON.parse(localStorage.getItem("cart")) || []
        setCart(localCart)
    }, [])

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
                    <ModalBuy
                        showModalBuy={showModalBuy}
                        setShowModalBuy={setShowModalBuy}
                        value={value}
                        setValue={setValue}
                        updateCountProduct={updateCountProduct}
                        inCart={inCart}
                    />
                    <ModalDelete
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        handleDelete={handleDelete}
                    />
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
                                            {
                                                cart.length > 0 &&
                                                cart.map(item => (
                                                    <CartItemM
                                                        key={item.code}
                                                        setShowDeleteModal={setShowDeleteModal}
                                                        isConfirmation={isConfirmation}
                                                        setShowModalBuy={setShowModalBuy}
                                                        prodcut={item}
                                                        setValue={setValue}
                                                        setMainCode={setMainCode}
                                                    />
                                                ))
                                            }

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
                                            {
                                                cart.length > 0 &&
                                                cart.map(item => (
                                                    <CartItem
                                                        key={item.code}
                                                        setShowModalBuy={setShowModalBuy}
                                                        isConfirmation={isConfirmation}
                                                        setShowDeleteModal={setShowDeleteModal}
                                                        prodcut={item}
                                                        setValue={setValue}
                                                        setMainCode={setMainCode}
                                                    />
                                                ))
                                            }
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


