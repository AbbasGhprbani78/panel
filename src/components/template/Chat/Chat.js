import React from 'react'
import styles from '@/styles/Chat.module.css'
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import Select from '@/components/module/Select/Select'
export default function Chat() {
    return (
        <div className={styles.wrapperpage}>
            <SideBar />
            <div className={styles.pagecontent}>
                <Header title={"خانه"} />
                <div className={styles.maincontent}>
                    <Select />
                </div>
            </div>
        </div>
    )
}
