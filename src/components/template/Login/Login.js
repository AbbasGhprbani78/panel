"use client"
import React, { useEffect, useRef, useState } from 'react'
import Input from '@/components/module/Input/Input'
import styles from '@/styles/Login.module.css'
import { Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from 'axios'
import { MdOutlineMail } from "react-icons/md";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { MdEmail } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [step, setStep] = useState(1)
    const [isForget, setIsForget] = useState(false)
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [password, setPassword] = useState("");
    const [showResendMessage, setShowResendMessage] = useState(false);
    const [showFiledEmail, setShowEmail] = useState(false)
    const router = useRouter()
    const phone_number = localStorage.getItem('phone');


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);
            inputRefs.current[index - 1].focus();
        }
    };



    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    const [isPrivate, setIsPerivate] = useState(true)

    const handleToggle = () => {
        setIsPerivate((e) => !e);
    }

    const sendCodeAgainToEmail = async () => {

        const email = localStorage.getItem("email")

        if (email) {

            const body = {
                email
            }
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/password-reset/`, body)
                if (response.status === 200) {
                }
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: "top-left"
                })
                console.log(error)
            }
        }
    }


    const startTimer = () => {
        setTimeLeft(120)
        setShowResendMessage(false);

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setShowResendMessage(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        startTimer();
    }, [step]);




    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if (password.trim()) {
            const body = {
                phone_number,
                password
            }
            try {

                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login/`, body)
                if (response.status === 200) {
                    localStorage.setItem("refresh", response.data.refresh)
                    localStorage.setItem("access", response.data.access_token)
                    localStorage.removeItem("email")
                    localStorage.removeItem("phone")
                    router.push('/')
                }
            } catch (error) {

                toast.error(error.response.data.credential_error[0], {
                    position: "top-left"
                })
                console.log(error)
            }
        }

    }


    return (
        <>
            {
                windowWidth < 768 ?
                    <>

                        <div className={styles.logincontainerm}>
                            <img className={styles.logoformm} src="/images/logo.svg" alt="" />
                            {
                                step === 1 ?
                                    (
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
                                                    try {
                                                        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/check-number/`, values)
                                                        localStorage.setItem("phone", values.phone_number)
                                                        if (response.status === 200) {
                                                            setStep(2)
                                                        }
                                                    } catch (error) {

                                                        toast.error(error.response.data.message, {
                                                            position: "top-left"
                                                        })
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
                                                                icon={FaPhone}
                                                                value={values.phone_number}
                                                                onChange={handleChange}
                                                                type={"text"}
                                                            />
                                                            {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                                            <div className='mt-1'><Link href="/signup" className={styles.linksignup}>هنوز ثبت نام نکرده اید؟</Link>
                                                            </div>
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
                                    ) :
                                    step === 2 ?
                                        (
                                            <div className={styles.passwordform}>
                                                {
                                                    showFiledEmail ?
                                                        <>
                                                            <div className={styles.formpasswordcontent}>
                                                                <Formik
                                                                    validate={(values) => {
                                                                        const errors = {};
                                                                        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
                                                                        if (values.email === "") {
                                                                            errors.email = "وارد کردن ایمیل اجباری میباشد";
                                                                        } else if (!emailRegex.test(values.email)) {
                                                                            errors.email = "ایمیل معتبر نیست";
                                                                        }
                                                                        return errors;
                                                                    }}

                                                                    initialValues={{
                                                                        email: ""
                                                                    }}

                                                                    onSubmit={async (values, { setSubmitting }) => {

                                                                        try {
                                                                            localStorage.setItem("email", values.email)
                                                                            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/password-reset/`, values)
                                                                            if (response.status === 200) {
                                                                                setShowEmail(false)
                                                                                setStep(3)
                                                                            }
                                                                        } catch (error) {

                                                                            toast.error(error.response.data.email[0], {
                                                                                position: "top-left"
                                                                            })
                                                                            console.log(error)
                                                                            setSubmitting(false);
                                                                        }
                                                                    }}
                                                                >
                                                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                                                        <form onSubmit={handleSubmit}>
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
                                                                            <div className='text-center mt-5'>
                                                                                <button
                                                                                    className={`${styles.btnphoneform} ${isSubmitting ? styles.disablebtn : ""}`}
                                                                                    type='submit'
                                                                                    disabled={isSubmitting}
                                                                                >
                                                                                    ارسال
                                                                                    <FaArrowLeftLong className={styles.iconformphone} />
                                                                                </button>
                                                                            </div>
                                                                        </form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                        </> :
                                                        <>
                                                            <p className={styles.paneltext}>
                                                                رمز عبور خود را وارد کنید
                                                            </p>
                                                            <div className={styles.formpasswordcontent}>
                                                                <form onSubmit={handlePasswordSubmit}>
                                                                    <div>
                                                                        <Input
                                                                            name="password"
                                                                            label="کلمه عبور"
                                                                            icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                                            value={password}
                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                            type={isPrivate ? "password" : "text"}
                                                                            handleToggle={handleToggle}
                                                                        />
                                                                        {/* {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>} */}
                                                                    </div>
                                                                    <p className={styles.helptext}>
                                                                        رمز عبوری را که از قبل، برای خود انتخاب کردید، وارد کنید یا با زدن دکمه زیر "کد ورود یک‌بار مصرف" دریافت کنید.
                                                                    </p>
                                                                    <p className={styles.forgettext} onClick={() => setIsForget(true)}>فراموش کردید؟</p>

                                                                    <div className='text-center mt-5'>
                                                                        <button
                                                                            className={styles.btnphoneform}
                                                                            type='submit'
                                                                        >
                                                                            ادامه
                                                                            <FaArrowLeftLong className={styles.iconformphone} />
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                {
                                                                    isForget &&
                                                                    <>
                                                                        <div className='text-center'>
                                                                            <button className={styles.sendcodebtn} onClick={() => setShowEmail(true)} >
                                                                                <MdOutlineMail className={styles.mailicon} />
                                                                                <span className={`mx-2 ${styles.textsendsms}`}>
                                                                                    ارسال کد یکبار مصرف به ایمیل
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                        <div className='text-center'>
                                                                            <button className={styles.sendcodebtn} >
                                                                                <MdOutlineMail className={styles.mailicon} />
                                                                                <span className={`mx-2 ${styles.texttosend}`}>
                                                                                    ارسال کد یکبار مصرف از طریق پیامک
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </>
                                                }

                                            </div>
                                        ) :
                                        (
                                            <div className={styles.sendcodeform}>
                                                <p className={styles.textpassword}>
                                                    رمز یکبار مصرف به ارسال شده
                                                </p>


                                                <Formik
                                                    validate={(values) => {
                                                        const errors = {};
                                                        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

                                                        if (values.email === "") {
                                                            errors.email = "وارد کردن ایمیل اجباری میباشد";
                                                        } else if (!emailRegex.test(values.email)) {
                                                            errors.email = "ایمیل معتبر نیست";
                                                        }
                                                        if (values.new_password === "") {
                                                            errors.new_password = "وارد کردن رمز عبور جدبد اجباری میباشد";
                                                        }
                                                        if (values.code === "") {
                                                            errors.code = "وارد کردن کد اجباری میباشد"
                                                        }

                                                        return errors;
                                                    }}

                                                    initialValues={{
                                                        email: localStorage.getItem("email"),
                                                        new_password: "",
                                                        code: ""
                                                    }}

                                                    onSubmit={async (values, { setSubmitting }) => {
                                                        try {
                                                            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/password-reset-confirm/`, values)
                                                            if (response.status === 200) {
                                                                setPassword("")
                                                                setIsForget(false)
                                                                setStep(2)
                                                            }
                                                        } catch (error) {
                                                            console.log(error)
                                                            toast.error(error.response.data.non_field_errors[0], {
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
                                                                    name="new_password"
                                                                    label="رمز عبور جدید"
                                                                    icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                                    value={values.new_password}
                                                                    onChange={handleChange}
                                                                    handleToggle={handleToggle}
                                                                    type={isPrivate ? "password" : "text"}
                                                                />
                                                                {errors.new_password && touched.new_password && <span className={styles.errorinput}>{errors.new_password}</span>}
                                                            </div>
                                                            <div>
                                                                <Input
                                                                    name="code"
                                                                    label="کد"
                                                                    icon={""}
                                                                    value={values.code}
                                                                    onChange={handleChange}
                                                                    type={"text"}
                                                                />
                                                                {errors.code && touched.code && <span className={styles.errorinput}>{errors.code}</span>}
                                                            </div>
                                                            <div className='text-center mt-5'>
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

                                                {
                                                    showResendMessage ? (
                                                        <div className='text-center d-flex justify-content-center'>
                                                            <p
                                                                className={`${styles.time} ${styles.againcode}`}
                                                                onClick={() => {
                                                                    sendCodeAgainToEmail()
                                                                    startTimer()
                                                                }}
                                                            >
                                                                ارسال مجدد
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className={styles.time}>
                                                            {formatTime(timeLeft)}
                                                        </p>
                                                    )
                                                }

                                            </div>
                                        )
                            }

                            <p className={styles.textco}>Powered By ARIISCO</p>
                        </div>

                    </> :
                    <>
                        <div className={styles.logincontainer}>
                            <Col md={6} className={styles.formcontainer}>
                                {
                                    step === 1 ?
                                        (
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
                                                        try {
                                                            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/check-number/`, values)
                                                            localStorage.setItem("phone", values.phone_number)
                                                            if (response.status === 200) {
                                                                setStep(2)
                                                            }
                                                        } catch (error) {

                                                            toast.error(error.response.data.message, {
                                                                position: "top-left"
                                                            })
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
                                                                    icon={FaPhone}
                                                                    value={values.phone_number}
                                                                    onChange={handleChange}
                                                                    type={"text"}
                                                                />
                                                                {errors.phone_number && touched.phone_number && <span className={styles.errorinput}>{errors.phone_number}</span>}
                                                                <div className='mt-1'><Link href="/signup" className={styles.linksignup}>هنوز ثبت نام نکرده اید؟</Link>
                                                                </div>
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
                                        ) :
                                        step === 2 ?
                                            (
                                                <div className={styles.passwordform}>
                                                    {
                                                        showFiledEmail ?

                                                            <>
                                                                <div className={styles.formpasswordcontent}>
                                                                    <Formik
                                                                        validate={(values) => {
                                                                            const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
                                                                            const errors = {};
                                                                            if (values.email === "") {
                                                                                errors.email = "وارد کردن ایمیل اجباری میباشد";
                                                                            } else if (!emailRegex.test(values.email)) {
                                                                                errors.email = "ایمیل معتبر نیست";
                                                                            }
                                                                            return errors;
                                                                        }}

                                                                        initialValues={{
                                                                            email: ""
                                                                        }}

                                                                        onSubmit={async (values, { setSubmitting }) => {
                                                                            try {
                                                                                localStorage.setItem("email", values.email)
                                                                                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/password-reset/`, values)
                                                                                if (response.status === 200) {
                                                                                    setShowEmail(false)
                                                                                    setStep(3)
                                                                                }
                                                                            } catch (error) {

                                                                                toast.error(error.response.data.email[0], {
                                                                                    position: "top-left"
                                                                                })
                                                                                console.log(error)
                                                                                setSubmitting(false);
                                                                            }
                                                                        }}
                                                                    >
                                                                        {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                                                            <form onSubmit={handleSubmit}>
                                                                                <div>
                                                                                    <Input
                                                                                        Input
                                                                                        name="email"
                                                                                        label="ایمیل"
                                                                                        icon={MdEmail}
                                                                                        value={values.email}
                                                                                        onChange={handleChange}
                                                                                        type={"text"}
                                                                                    />

                                                                                    {errors.email && touched.email && <span className={styles.errorinput}>{errors.email}</span>}
                                                                                </div>
                                                                                <div className='text-center mt-5'>
                                                                                    <button
                                                                                        className={`${styles.btnphoneform} ${isSubmitting ? styles.disablebtn : ""}`}
                                                                                        type='submit'
                                                                                        disabled={isSubmitting}
                                                                                    >
                                                                                        ارسال
                                                                                        <FaArrowLeftLong className={styles.iconformphone} />
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        )}
                                                                    </Formik>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <p className={styles.paneltext}>
                                                                    رمز عبور خود را وارد کنید
                                                                </p>
                                                                <div className={styles.formpasswordcontent}>

                                                                    <form onSubmit={handlePasswordSubmit}>
                                                                        <div>
                                                                            <Input
                                                                                name="password"
                                                                                label="کلمه عبور"
                                                                                icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                type={isPrivate ? "password" : "text"}
                                                                                handleToggle={handleToggle}
                                                                            />
                                                                            {/* {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>} */}
                                                                        </div>
                                                                        <p className={styles.helptext}>
                                                                            رمز عبوری را که از قبل، برای خود انتخاب کردید، وارد کنید یا با زدن دکمه زیر "کد ورود یک‌بار مصرف" دریافت کنید.
                                                                        </p>

                                                                        <div className='text-center mt-5'>
                                                                            <button
                                                                                className={styles.btnphoneform}
                                                                                type='submit'
                                                                            >
                                                                                ادامه
                                                                                <FaArrowLeftLong className={styles.iconformphone} />
                                                                            </button>
                                                                        </div>
                                                                    </form>

                                                                    <p className={styles.forgettext} onClick={() => setIsForget(true)}>فراموش کردید؟</p>

                                                                    {
                                                                        isForget &&
                                                                        <>
                                                                            <div className='text-center'>
                                                                                <button className={styles.sendcodebtn} >
                                                                                    <MdOutlineMail className={styles.mailicon} />
                                                                                    <span className={`mx-2 ${styles.texttosend}`}>
                                                                                        ارسال کد یکبار مصرف از طریق پیامک
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div className='text-center' onClick={() => setShowEmail(true)}>
                                                                                <button className={styles.sendcodebtn}>
                                                                                    <MdOutlineMail className={styles.mailicon} />
                                                                                    <span className={`mx-2 ${styles.texttosend}`}>
                                                                                        ارسال کد یکبار مصرف به ایمیل
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </>
                                                    }
                                                </div>
                                            ) :
                                            (
                                                <div className={styles.sendcodeform}>
                                                    <p className={styles.textpassword}>
                                                        رمز یکبار مصرف به شماره شما ارسال شد
                                                    </p>
                                                    <div className={styles.sendcodecontent}>
                                                        <Formik
                                                            validate={(values) => {
                                                                const errors = {};
                                                                const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

                                                                if (values.email === "") {
                                                                    errors.email = "وارد کردن ایمیل اجباری میباشد";
                                                                } else if (!emailRegex.test(values.email)) {
                                                                    errors.email = "ایمیل معتبر نیست";
                                                                }
                                                                if (values.new_password === "") {
                                                                    errors.new_password = "وارد کردن رمز عبور جدبد اجباری میباشد";
                                                                }
                                                                if (values.code === "") {
                                                                    errors.code = "وارد کردن کد اجباری میباشد"
                                                                }

                                                                return errors;
                                                            }}

                                                            initialValues={{
                                                                email: localStorage.getItem("email"),
                                                                new_password: "",
                                                                code: ""
                                                            }}

                                                            onSubmit={async (values, { setSubmitting }) => {
                                                                try {
                                                                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/password-reset-confirm/`, values)
                                                                    if (response.status === 200) {
                                                                        setPassword("")
                                                                        setIsForget(false)
                                                                        setStep(2)
                                                                    }
                                                                } catch (error) {
                                                                    console.log(error)
                                                                    toast.error(error.response.data.non_field_errors[0], {
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
                                                                            name="new_password"
                                                                            label="رمز عبور جدید"
                                                                            icon={isPrivate ? IoEyeSharp : IoEyeOff}
                                                                            value={values.new_password}
                                                                            onChange={handleChange}
                                                                            handleToggle={handleToggle}
                                                                            type={isPrivate ? "password" : "text"}
                                                                        />
                                                                        {errors.new_password && touched.new_password && <span className={styles.errorinput}>{errors.new_password}</span>}
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            name="code"
                                                                            label="کد"
                                                                            icon={""}
                                                                            value={values.code}
                                                                            onChange={handleChange}
                                                                            type={"text"}
                                                                        />
                                                                        {errors.code && touched.code && <span className={styles.errorinput}>{errors.code}</span>}
                                                                    </div>
                                                                    <div className='text-center mt-5'>
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

                                                        {showResendMessage ? (
                                                            <div className='text-center d-flex justify-content-center'>
                                                                <p
                                                                    className={`${styles.time} ${styles.againcode}`}
                                                                    onClick={() => {
                                                                        sendCodeAgainToEmail()
                                                                        startTimer()
                                                                    }}
                                                                >
                                                                    ارسال مجدد
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <p className={styles.time}>
                                                                {formatTime(timeLeft)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                }

                            </Col>
                            <Col md={6} className={styles.logocontainer}>
                                <img className={styles.logo} src="/images/logo.svg" alt="logo" />
                                <p className={styles.textco}>Powered By ARIISCO</p>
                            </Col>
                        </div >
                    </>
            }
            < ToastContainer />
        </>

    )
}




// const handleInputChange = (e, index) => {
//     const { value } = e.target;
//     if (/^[0-9]$/.test(value)) {
//         const newValues = [...values];
//         newValues[index] = value;
//         setValues(newValues);
//         if (index < inputRefs.current.length - 1) {
//             inputRefs.current[index + 1].focus();
//         }
//     }
// };





