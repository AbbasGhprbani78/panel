"use client"
import React, { useState } from 'react'
import styles from "@/styles/Products.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import { IoIosArrowBack } from "react-icons/io";
import ProductItem from '@/components/module/ProductItem/ProductItem'
import { useRouter } from 'next/navigation'

export default function Products() {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [showmodal, setShowmodal] = useState(false)

    const gotocart = () => {
        if (isAdd) {
            router.replace("/cart")
        } else {
            setShowmodal(true)
        }
    }
    return (
        <>
            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
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
                                <ProductItem setIsAdd={setIsAdd}/>
                                <ProductItem setIsAdd={setIsAdd}/>
                                <ProductItem setIsAdd={setIsAdd}/>
                                <ProductItem setIsAdd={setIsAdd}/>
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
