"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/Products.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import { IoIosArrowBack } from "react-icons/io";
import ProductItem from '@/components/module/ProductItem/ProductItem'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ModalBuy from '@/components/module/ModalBuy/ModalBuy'



export default function Products() {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [showmodal, setShowmodal] = useState(false)
    const [value, setValue] = useState("")
    const [showModalBuy, setShowModalBuy] = useState(false)
    const [products, setProducts] = useState([])
    const [filterProduct, setFilterProduct] = useState([])


    const gotocart = () => {
        if (isAdd) {
            router.replace("/cart")
        } else {
            setShowmodal(true)
        }
    }

    const getAllProducts = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}//`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }


    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <>

            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <ModalBuy showModalBuy={showModalBuy} setShowModalBuy={setShowModalBuy} value={value} setValue={setValue} />
                    <div className={`${styles.modalcontainer} ${showmodal ? styles.show : ""}`}>
                        <div className={styles.modalhide} onClick={() => setShowmodal(false)}></div>
                        <div className={styles.modalcontent}>
                            <p>هنوز محصولی به سبدخرید اضافه نکرده اید</p>
                            <button className={styles.modalbtn} onClick={() => setShowmodal(false)}>متوجه شدم</button>
                        </div>
                    </div>
                    <Header title={"محصولات"} />
                    <div className={styles.maincontent}>
                        <div className={styles.wrapper}>
                            <SearchBox
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className={styles.ProductsPage}>
                            <div className={styles.ProductsBox}>
                                <ProductItem setIsAdd={setIsAdd} setShowModalBuy={setShowModalBuy} />
                                <ProductItem setIsAdd={setIsAdd} setShowModalBuy={setShowModalBuy} />
                                <ProductItem setIsAdd={setIsAdd} setShowModalBuy={setShowModalBuy} />
                                <ProductItem setIsAdd={setIsAdd} setShowModalBuy={setShowModalBuy} />
                            </div>
                            <div>
                                <button className={styles.ButtonBox} onClick={gotocart}>
                                    <span>ادامه</span>
                                    <IoIosArrowBack />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


//app/add-product