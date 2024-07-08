import React from 'react'
import styles from './Filter.module.css'
export default function Filter() {
    return (
        <div className={styles.filterwrapper}>
            <select className={styles.filterselect}>
                <option value="-1" selected>فیلتر</option>
                <option value={"name"}>اسم سفارش</option>
                <option value={"number"}>شماره درخواست</option>
                <option value={"date"}>تاریخ سفارشات</option>
            </select>
        </div>

    )
}
