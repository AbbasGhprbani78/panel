"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/signup.module.css'
import { Col } from 'react-bootstrap'
import { FaUser, FaArrowLeftLong } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { TbBuildingEstate } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Input from '@/components/module/Input/Input';
import { Formik } from 'formik';
import Texteara from '@/components/module/Texteara/Texteara';
import Link from 'next/link';
import Select from '@/components/module/Select/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isPrivate, setIsPerivate] = useState(true)
    const [province, setPovince] = useState("")
    const router = useRouter()

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

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
                        <div className={styles.signupcontainerm}>
                            <img className={styles.logoformm} src="/images/logo.svg" alt="" />
                            <div className={styles.signupform}>
                                <div className={styles.headersignup}>
                                    <div className='d-flex align-items-center'>
                                        <FaUser className={styles.usericon} />
                                        <p className={styles.Signuptext}>اطلاعات من</p>
                                    </div>
                                    <Link href='/login' className={styles.linksignin}>قبلا ثبت نام کرده اید؟</Link>
                                </div>
                                <Formik
                                    validate={(values) => {
                                        const errors = {};
                                        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                                        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
                                        if (values.full_name === "") {
                                            errors.full_name = "وارد کردن نام و نام خانوادگی اجباری میباشد";
                                        }
                                        if (values.phone_number === "") {
                                            errors.phone_number = "وارد کردن شماره تلفن اجباری میباشد";
                                        } else if (!phoneRegex.test(values.phone_number)) {
                                            errors.phone_number = "شماره تلفن معتبر نیست";
                                        }
                                        if (values.state === "") {
                                            errors.state = "وارد کردن استان اجباری میباشد";
                                        }
                                        if (values.email === "") {
                                            errors.email = "وارد کردن ایمیل اجباری میباشد";
                                        } else if (!emailRegex.test(values.email)) {
                                            errors.email = "ایمیل معتبر نیست";
                                        }
                                        if (values.address === "") {
                                            errors.address = "وارد کردن آدرس اجباری میباشد";
                                        }
                                        if (values.password === "") {
                                            errors.password = "وارد کردن رمز عبور اجباری میباشد";
                                        }

                                        return errors;
                                    }}

                                    initialValues={{
                                        full_name: "",
                                        phone_number: "",
                                        state: "",
                                        email: "",
                                        address: "",
                                        password: ""
                                    }}

                                    onSubmit={async (values, { setSubmitting }) => {
                                        try {
                                            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup/`, values)
                                            if (response.status === 200) {
                                                setSubmitting(false)
                                            }
                                        } catch (error) {
                                            console.log(error)
                                            toast.error(error.response.data.message, {
                                                position: "top-left"
                                            })
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                        <form onSubmit={handleSubmit} className={styles.formcontent}>

                                            <div>
                                                <Input
                                                    name="full_name"
                                                    label="نام و نام خانوادگی"
                                                    icon={FaUser}
                                                    value={values.full_name}
                                                    onChange={handleChange}
                                                    type={"text"}
                                                />
                                                {errors.full_name && touched.full_name && <span className={styles.errorinput}>{errors.full_name}</span>}
                                            </div>
                                            <div>
                                                <Input
                                                    name="phone_number"
                                                    label="شماره تماس"
                                                    icon={FaPhone}
                                                    value={values.phone_number}
                                                    onChange={handleChange}
                                                    type={"text"}
                                                />
                                                {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                            </div>
                                            <div>
                                                <Select
                                                    name="state"
                                                    label="استان"
                                                    icon={TbBuildingEstate}
                                                    value={values.state}
                                                    onChange={(value) => setFieldValue('state', value)}
                                                />
                                                {errors.state && touched.state && <span className={styles.errorinput}>{errors.state}</span>}
                                            </div>
                                            <div>
                                                <Input
                                                    name="email"
                                                    label="ایمیل"
                                                    icon={MdEmail}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    type={"text"}
                                                />
                                                {errors.email && touched.email && <span className={styles.errorinput}>{errors.email}</span>}
                                            </div>
                                            <div>
                                                <Input
                                                    name="password"
                                                    label="رمز عبور"
                                                    icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    handleToggle={handleToggle}
                                                    type={isPrivate ? "password" : "text"}
                                                />
                                                {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>}
                                            </div>
                                            <div>
                                                <Texteara
                                                    name="address"
                                                    label="آدرس"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                />
                                                {errors.address && touched.address && <span className={styles.errorinput}>{errors.address}</span>}
                                            </div>
                                            <button
                                                className={`${styles.btnsignup} ${isSubmitting ? styles.disablebtn : ""}`}
                                                type='submit'
                                                disabled={isSubmitting}
                                            >
                                                ادامه
                                                <FaArrowLeftLong className={styles.btnsignupicon} />
                                            </button>
                                        </form>
                                    )}

                                </Formik>
                            </div>
                            <p className={styles.textco}>Powered By ARIISCO</p>
                        </div>
                    </> :
                    <>
                        <div className={styles.signupcontainer}>
                            <Col md={6} className={styles.formcontainer}>
                                <div className={styles.signupform}>
                                    <div className={styles.headersignup}>
                                        <div className='d-flex align-items-center'>
                                            <FaUser className={styles.usericon} />
                                            <p className={styles.Signuptext}>اطلاعات من</p>
                                        </div>
                                        <Link href='/login' className={styles.linksignin}>قبلا ثبت نام کرده اید؟</Link>
                                    </div>
                                    <Formik
                                        validate={(values) => {
                                            const errors = {};
                                            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                                            const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
                                            if (values.full_name === "") {
                                                errors.full_name = "وارد کردن نام و نام خانوادگی اجباری میباشد";
                                            }
                                            if (values.phone_number === "") {
                                                errors.phone_number = "وارد کردن شماره تلفن اجباری میباشد";
                                            } else if (!phoneRegex.test(values.phone_number)) {
                                                errors.phone_number = "شماره تلفن معتبر نیست";
                                            }
                                            if (values.state === "") {
                                                errors.state = "وارد کردن استان اجباری میباشد";
                                            }
                                            if (values.email === "") {
                                                errors.email = "وارد کردن ایمیل اجباری میباشد";
                                            } else if (!emailRegex.test(values.email)) {
                                                errors.email = "ایمیل معتبر نیست";
                                            }
                                            if (values.address === "") {
                                                errors.address = "وارد کردن آدرس اجباری میباشد";
                                            }
                                            if (values.password === "") {
                                                errors.password = "وارد کردن رمز عبور اجباری میباشد";
                                            }

                                            return errors;
                                        }}

                                        initialValues={{
                                            full_name: "",
                                            phone_number: "",
                                            state: province,
                                            email: "",
                                            address: "",
                                            password: ""
                                        }}

                                        onSubmit={async (values, { setSubmitting }) => {
                                            try {
                                                const response = await axios.post(`https://behrizanpanel.ariisco.com/user/signup/`, values)
                                                if (response.status === 201) {
                                                    setSubmitting(false)
                                                    router.push("/login")
                                                }
                                            } catch (error) {
                                                console.log(error)
                                                setSubmitting(false);
                                                toast.error(error.response.data.message, {
                                                    position: "top-left"
                                                })

                                            }
                                        }}
                                    >
                                        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
                                            <form onSubmit={handleSubmit} className={styles.formcontent}>
                                                <div>
                                                    <Input
                                                        name="full_name"
                                                        label="نام و نام خانوادگی"
                                                        icon={FaUser}
                                                        value={values.full_name}
                                                        onChange={handleChange}
                                                        type={"text"}
                                                    />
                                                    {errors.full_name && touched.full_name && <span className={styles.errorinput}>{errors.full_name}</span>}
                                                </div>
                                                <div>
                                                    <Input
                                                        name="phone_number"
                                                        label="شماره تماس"
                                                        icon={FaPhone}
                                                        value={values.phone_number}
                                                        onChange={handleChange}
                                                        type={"text"}
                                                    />
                                                    {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                                </div>
                                                <div>
                                                    <Select
                                                        name="state"
                                                        label="استان"
                                                        icon={TbBuildingEstate}
                                                        value={values.state}
                                                        onChange={(value) => setFieldValue('state', value)}
                                                    />
                                                    {errors.state && touched.state && <span className={styles.errorinput}>{errors.state}</span>}
                                                </div>
                                                <div>
                                                    <Input
                                                        name="email"
                                                        label="ایمیل"
                                                        icon={MdEmail}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        type={"text"}
                                                    />
                                                    {errors.email && touched.email && <span className={styles.errorinput}>{errors.email}</span>}
                                                </div>
                                                <div>
                                                    <Input
                                                        name="password"
                                                        label="رمز عبور"
                                                        icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        handleToggle={handleToggle}
                                                        type={isPrivate ? "password" : "text"}
                                                    />
                                                    {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>}
                                                </div>
                                                <div>
                                                    <Texteara
                                                        name="address"
                                                        label="آدرس"
                                                        value={values.address}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.address && touched.address && <span className={styles.errorinput}>{errors.address}</span>}
                                                </div>
                                                <button
                                                    className={`${styles.btnsignup} ${isSubmitting ? styles.disablebtn : ""}`}
                                                    type='submit'
                                                    disabled={isSubmitting}
                                                >
                                                    ادامه
                                                    <FaArrowLeftLong className={styles.btnsignupicon} />
                                                </button>
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
            <ToastContainer />
        </>
    )
}


// ${process.env.REACT_APP_BASE_URL}