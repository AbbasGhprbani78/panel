"use client"
import React, { useEffect, useState } from 'react'
import Input from '@/components/module/Input/Input'
import styles from '@/styles/Login.module.css'
import { Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { LuPhone, FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios'

export default function Login() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)


    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])
    return (
        <>
            {
                windowWidth < 768 ?
                    <>
                        <div className={styles.logincontainerm}>
                            <img className={styles.logoformm} src="/images/logo.svg" alt="" />
                            <div className={styles.phoneform}>
                                <Formik
                                    validate={(values) => {
                                        const errors = {};
                                        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

                                        if (!values.phone_number) {
                                            errors.phone_number = "وارد کردن  شماره تلفن اجباری میباشد";
                                        } else if (!phoneRegex.test(values.phone_number)) {
                                            errors.phone_number = "شماره تلفن معتبر نیست";
                                        }
                                        return errors;
                                    }}

                                    initialValues={{
                                        phone_number: ""
                                    }}

                                    onSubmit={async (values, { setSubmitting }) => {
                                        console.log(values)
                                        try {
                                            const response = await axios.post(`http://localhost:4000/login`, values)
                                            if (response.status === 200) {
                                                setSubmitting(false)
                                            }
                                        } catch (error) {
                                            console.log(error)
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                        <form onSubmit={handleSubmit}>
                                            <p className={styles.paneltext}>
                                                ورود به پنل Behrizan
                                            </p>

                                            <div className={`${styles.inputwrapper}`} >
                                                <Input
                                                    name="phone_number"
                                                    label="شماره تماس"
                                                    icon={LuPhone}
                                                    value={values.phone_number}
                                                    onChange={handleChange}
                                                />
                                                {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                            </div>

                                            <div className={`${styles.btnwrapper}`}>
                                                <button
                                                    className={`${styles.btnphoneform} ${isSubmitting ? styles.disablebtn : ""}`}
                                                    type='submit'
                                                    disabled={isSubmitting}
                                                >
                                                    ادامه

                                                    <FaArrowLeftLong className={styles.iconformphone} />
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            <p className={styles.textco}>Powered By ARIISCO</p>
                        </div>
                    </> :
                    <>
                        <div className={styles.logincontainer}>
                            <Col md={6} className={styles.formcontainer}>
                                <div className={styles.phoneform}>
                                    <Formik
                                        validate={(values) => {
                                            const errors = {};
                                            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                                            if (!values.phone_number) {
                                                errors.phone_number = "وارد کردن  شماره تلفن اجباری میباشد";
                                            } else if (!phoneRegex.test(values.phone_number)) {
                                                errors.phone_number = "شماره تلفن معتبر نیست";
                                            }
                                            return errors;
                                        }}

                                        initialValues={{
                                            phone_number: ""
                                        }}

                                        onSubmit={async (values, { setSubmitting }) => {
                                            console.log(values)
                                            try {
                                                const response = await axios.post(`http://localhost:4000/login`, values)
                                                if (response.status === 200) {
                                                    setSubmitting(false)
                                                }
                                            } catch (error) {
                                                console.log(error)
                                                setSubmitting(false);
                                            }
                                        }}
                                    >
                                        {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                            <form onSubmit={handleSubmit}>
                                                <p className={styles.paneltext}>
                                                    ورود به پنل Behrizan
                                                </p>

                                                <div className={`${styles.inputwrapper}`} >
                                                    <Input
                                                        name="phone_number"
                                                        label="شماره تماس"
                                                        icon={LuPhone}
                                                        value={values.phone_number}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                                </div>

                                                <div className={`${styles.btnwrapper}`}>
                                                    <button
                                                        className={`${styles.btnphoneform} ${isSubmitting ? styles.disablebtn : ""}`}
                                                        type='submit'
                                                        disabled={isSubmitting}
                                                    >
                                                        ادامه
                                                        <FaArrowLeftLong className={styles.iconformphone} />
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </Col>
                            <Col md={6} className={styles.logocontainer}>
                                <img className={styles.logo} src="/images/logo.svg" alt="logo" />
                                <p className={styles.textco}>Powered By ARIISCO</p>
                            </Col>
                        </div>
                    </>
            }
        </>

    )
}
