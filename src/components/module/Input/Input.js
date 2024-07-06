import React from 'react'
import styles from './Input.module.css'
export default function Input({ label, value, onChange, name, type, icon: Icon, handleToggle }) {
    return (
        <div className={`${styles.inputwrapper} mt-4`}>
            <label className={styles.lableinput}>{label}</label>
            <input
                name={name}
                type={type}
                className={styles.input}
                autoComplete='off'
                value={value}
                onChange={onChange}
            />{
                handleToggle ?
                    Icon && <Icon className={styles.icon} onClick={handleToggle} /> :
                    Icon && <Icon className={styles.icon} />
            }

        </div>
    )
}
