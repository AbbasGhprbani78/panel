"use client"
import { useState } from 'react';
import React from 'react'
import styles from './Offcanvas.module.css'
import { IoCloseSharp } from "react-icons/io5";
import Link from 'next/link';
import { MdWindow } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function OffcanvasMenu({ setShowSideBar, showSideBar }) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <>

            <div className={`${styles.offcanavscontent} ${showSideBar ? styles.slideIn : styles.slideOut}`}>
                <div className='d-flex justify-content-end'>
                    <IoCloseSharp className={styles.closeIconside} onClick={() => setShowSideBar(false)} />
                </div>
                <div className={styles.sidebarlistwrapper}>
                    <ul className={styles.sidebarlist}>
                        <Link href={"#"} className={styles.listitem}>
                            <MdWindow className={styles.iconsidebar} />
                            <span className={styles.listitemtext}>خانه</span>
                        </Link>
                        <li className={`${styles.listitem} ${styles.parentsub}`} onClick={toggleSubMenu}>
                            <div className={`${styles.orderside}`}>
                                <div>
                                    <FaBoxArchive className={styles.iconsidebar} />
                                    <span className={styles.listitemtext}>سفارشات</span>
                                </div>
                                {isSubMenuOpen ? <FaAngleUp className={styles.iconarrow} /> : <FaAngleDown className={styles.iconarrow} />}
                            </div>
                            {isSubMenuOpen && (
                                <ul className={styles.submenu}>
                                    <li className={styles.submenuitem}>
                                        <Link href={"#"}>ثبت سفارش جدید</Link>
                                    </li>
                                    <li className={styles.submenuitem}>
                                        <Link href={"#"}>تاریخچه سفارشات</Link>
                                    </li>
                                    <li className={styles.submenuitem}>
                                        <Link href={"#"}>پیگیری سفارشات</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <Link href={"#"} className={styles.listitem}>
                            <FaRegBookmark className={styles.iconsidebar} />
                            <span className={styles.listitemtext}>گزارشات</span>
                        </Link>
                        <Link href={"#"} className={styles.listitem}>
                            <FaHeadphones className={styles.iconsidebar} />
                            <span className={styles.listitemtext}>پشتیبانی</span>
                        </Link>
                        <Link href={"#"} className={`${styles.listitem} ${styles.logoutsidebar}`}>
                            <CiLogin className={styles.iconsidebar} />
                            <span className={styles.listitemtext}>خروج</span>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}

