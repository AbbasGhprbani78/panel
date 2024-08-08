"use client"
import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from './Header.module.css'
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import OffcanvasMenu from '../OffcanvasMenu/OffcanvasMenu';
import Link from 'next/link';
import { CountContext } from '@/context/CartContext';
export default function Header({ title }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showSideBar, setShowSideBar] = useState(false)
    const titleRef = useRef(null);

    const { countProduct } = useContext(CountContext)

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])


    useEffect(() => {
        if (titleRef.current) {
            document.documentElement.style.setProperty('--title-width', `${titleRef.current.offsetWidth}px`);
        }
    }, [title]);

    return (
        <>
            {
                windowWidth < 1025 ?
                    <>
                        <OffcanvasMenu setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
                        <div className={styles.headermobile}>
                            <RxHamburgerMenu className={styles.iconham} onClick={() => setShowSideBar(true)} />
                            <Link href={"/"}><img src="/images/logo.svg" alt="logo" className={styles.logomobile} /></Link>
                        </div>
                    </>
                    :
                    <div className={styles.headercontainer}>
                        <span className={styles.headertext} ref={titleRef}>{title}</span>
                        <Link href={"/cart"} className={styles.iconheaderwrap}>
                            <div>
                                <IoCartOutline className={styles.iconheader} />
                            </div>
                            <div className={styles.countproduct}> {countProduct}</div>
                        </Link>

                    </div>

            }


        </>

    )
}
