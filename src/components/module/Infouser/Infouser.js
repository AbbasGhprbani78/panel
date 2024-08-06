"use client"
import React, { useEffect, useState } from 'react'
import styles from './InfoUser.module.css'
import { CiUser } from "react-icons/ci";
import ModalUser from '../ModalUser/ModalUser';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function Infouser() {

    const [showModal, setShowModal] = useState(false)
    const [userInfo, setUserInfo] = useState("")
    const router = useRouter()

    const getUserHandler = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get-user-informations/`, {
                headers,
            })

            if (response.status === 200) {
                setUserInfo(response.data[0])
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                router.push("/login")
            }
        }
    }


    useEffect(() => {
        getUserHandler()
    }, [])

    return (
        <>
            <ModalUser setShowModal={setShowModal} showModal={showModal} userInfo={userInfo} getUserHandler={getUserHandler} />
            <div className={styles.infouserwrapper}>
                <div className={styles.infousertop}>
                    <div className={styles.iconwrapper}>
                        <CiUser className={styles.iconuser} />
                    </div>
                    <p className={styles.userfullname}>{userInfo?.full_name}</p>
                </div>
                <div className={styles.userabout}>
                    <div className={styles.useraboutitem}>
                        <span className={styles.userabouttitle}>شماره تماس :</span>
                        <span className={styles.useraboutsub}>{userInfo?.phone_number}</span>
                    </div>
                    <div className={styles.useraboutitem}>
                        <span className={styles.userabouttitle}>ایمیل :</span>
                        <span className={styles.useraboutsub}>{userInfo?.email}</span>
                    </div>
                    <div className={styles.useraboutitem}>
                        <span className={styles.userabouttitle}>آدرس :</span>
                        <span className={styles.useraboutsub}>{userInfo?.address}</span>
                    </div>
                </div>
                <div className={styles.btnwrapper}>
                    <button className={styles.btnedituser} onClick={() => setShowModal(true)}>
                        ویرایش
                    </button>
                </div>
            </div>
        </>

    )
}
