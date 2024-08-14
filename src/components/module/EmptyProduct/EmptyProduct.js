import React from 'react'
import styles from './EmptyProduct.module.css'
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';

export default function EmptyProduct() {
    return (
        <div className={styles.cartempty}>
            <div className={styles.imgcartwrapper}>
                <img src="/images/carticon.svg" alt="basket" />
            </div>
            <p className={styles.text_empty}>فعلا سفارش جدیدی وجود ندارد</p>
            <Link href={"/products"} className={styles.btnempty}>
                ثبت سفارش
                <FaPlus className={styles.iconplus} />
            </Link>
        </div>
    )
}
