import React from 'react'
import styles from './Input.module.css'
export default function Input({ label, icon, value, onChange, name }) {
    return (
        <div className={`${styles.inputwrapper} mt-4`}>
            <label className={styles.lableinput}>{label}</label>
            <input
                name={name}
                type="text"
                className={styles.input}
                autoComplete='off'
                value={value}
                onChange={onChange}
            />

        </div>
    )
}
