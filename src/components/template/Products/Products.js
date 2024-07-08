import React from 'react'
import styles from "@/styles/Products.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import { IoIosArrowBack } from "react-icons/io";
import ProductItem from '@/components/module/ProductItem/ProductItem'

export default function Products() {
    return (
        <>
            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <Header />
                    <div className={styles.maincontent}>
                        <div className={styles.wrapper}>
                            <SearchBox />
                        </div>
                        <div className={styles.ProductsPage}>
                            <div className={styles.ProductsBox}>
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                            </div>
                            <div>
                                <button className={styles.ButtonBox}>
                                    <span>ادامه</span>
                                    <IoIosArrowBack />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
