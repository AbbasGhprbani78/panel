"use client"
import React, { useEffect, useRef, useState } from 'react'
import Input from '@/components/module/Input/Input'
import styles from '@/styles/Login.module.css'
import { Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { LuPhone, FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios'
import { MdOutlineMail } from "react-icons/md";
import Link from 'next/link'

export default function Login() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [step, setStep] = useState(2)
    const [isForget, setIsForget] = useState(false)
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [values, setValues] = useState(['', '', '', '']);
    const [showResendMessage, setShowResendMessage] = useState(false);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value)) {
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = values.join('');
        console.log(code)
        // try {
        //     const response = await axios.post('', { code });
        //     console.log('Response:', response.data);
        // } catch (error) {
        //     console.error(error);
        // }
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


    useEffect(() => {
        let timer;
        if (step === 3) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setShowResendMessage(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [step]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

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
                                                <p className={styles.paneltext}>
                                                    رمز عبور خود را وارد کنید
                                                </p>
                                                <Formik
                                                    validate={(values) => {
                                                        const errors = {};
                                                        if (!values.password) {
                                                            errors.password = "وارد کردن رمز عبور اجباری میباشد";
                                                        }
                                                        return errors;
                                                    }}

                                                    initialValues={{
                                                        password: ""
                                                    }}

                                                    onSubmit={async (values, { setSubmitting }) => {
                                                        console.log(values)
                                                        setSubmitting(false)
                                                    }}
                                                >
                                                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                                        <form className={styles.formpasswordcontent} onSubmit={handleSubmit}>
                                                            <div>
                                                                <Input
                                                                    name="password"
                                                                    label="کلمه عبور"
                                                                    icon={LuPhone}
                                                                    value={values.password}
                                                                    onChange={handleChange}
                                                                />
                                                                {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>}
                                                            </div>
                                                            <p className={styles.helptext}>
                                                                رمز عبوری را که از قبل، برای خود انتخاب کردید، وارد کنید یا با زدن دکمه زیر "کد ورود یک‌بار مصرف" دریافت کنید.
                                                            </p>
                                                            <p className={styles.forgettext} onClick={() => setIsForget(true)}>فراموش کردید؟</p>

                                                            <div className='text-center'>
                                                                <button className={styles.sendcodebtn}>
                                                                    <MdOutlineMail className={styles.mailicon} />
                                                                    <span className={`mx-2 ${styles.textsendsms}`}>
                                                                        ارسال کد یکبار مصرف از طریق پیامک
                                                                    </span>
                                                                    {/* <FaAngleLeft className={styles.angleicon} /> */}
                                                                </button>
                                                            </div>
                                                            {
                                                                isForget &&
                                                                <div className='text-center'>
                                                                    <button className={styles.sendcodebtn}>
                                                                        <MdOutlineMail className={styles.mailicon} />
                                                                        <span className={`mx-2 ${styles.textsendsms}`}>
                                                                            ارسال کد یکبار مصرف به ایمیل
                                                                        </span>
                                                                        {/* <FaAngleLeft className={styles.angleicon} /> */}
                                                                    </button>
                                                                </div>
                                                            }

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
                                            </div>
                                        ) :
                                        (
                                            <div className={styles.sendcodeform}>
                                                <p className={styles.textpassword}>
                                                    رمز یکبار مصرف به شماره زیر ارسال شده است
                                                </p>
                                                <div className={styles.sendcodecontent}>
                                                    <p className={styles.userphone}>0913 * * * * * 46</p>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className={styles.inputpasswordwrap}>
                                                            {Array.from({ length: 4 }).map((value, index) => (
                                                                <input
                                                                    className={styles.inputpassword}
                                                                    key={index}
                                                                    type="text"
                                                                    maxLength="1"
                                                                    value={value}
                                                                    ref={el => (inputRefs.current[index] = el)}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    onKeyDown={(e) => handleKeyDown(e, index)}

                                                                />
                                                            ))}
                                                        </div>
                                                        {
                                                            showResendMessage ? (
                                                                <div className='text-center d-flex justify-content-center'>
                                                                    <p className={`${styles.time} ${styles.againcode}`}>
                                                                        ارسال مجدد
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p className={styles.time}>
                                                                    {formatTime(timeLeft)}
                                                                </p>
                                                            )
                                                        }


                                                        <div className='mt-5'>
                                                            <button
                                                                className={`${styles.btnphoneform}`}
                                                                type='submit'
                                                            >
                                                                ادامه
                                                                <FaArrowLeftLong className={styles.iconformphone} />
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
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
                                                                <div className='mt-1'><Link href="/signup" className={styles.linksignup}>هنوز ثبت نام نکرده اید؟</Link>
                                                                </div>                                                            </div>

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
                                                    <p className={styles.paneltext}>
                                                        رمز عبور خود را وارد کنید
                                                    </p>
                                                    <Formik
                                                        validate={(values) => {
                                                            const errors = {};
                                                            if (!values.password) {
                                                                errors.password = "وارد کردن رمز عبور اجباری میباشد";
                                                            }
                                                            return errors;
                                                        }}

                                                        initialValues={{
                                                            password: ""
                                                        }}

                                                        onSubmit={async (values, { setSubmitting }) => {
                                                            console.log(values)
                                                            setSubmitting(false)
                                                        }}
                                                    >
                                                        {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                                                            <form className={styles.formpasswordcontent} onSubmit={handleSubmit}>
                                                                <div>
                                                                    <Input
                                                                        name="password"
                                                                        label="کلمه عبور"
                                                                        icon={LuPhone}
                                                                        value={values.password}
                                                                        onChange={handleChange}
                                                                    />
                                                                    {errors.password && touched.password && <span className={styles.errorinput}>{errors.password}</span>}
                                                                </div>
                                                                <p className={styles.helptext}>
                                                                    رمز عبوری را که از قبل، برای خود انتخاب کردید، وارد کنید یا با زدن دکمه زیر "کد ورود یک‌بار مصرف" دریافت کنید.
                                                                </p>
                                                                <p className={styles.forgettext} onClick={() => setIsForget(true)}>فراموش کردید؟</p>

                                                                <div className='text-center'>
                                                                    <button className={styles.sendcodebtn}>
                                                                        <MdOutlineMail className={styles.mailicon} />
                                                                        <span className={`mx-2 ${styles.texttosend}`}>
                                                                            ارسال کد یکبار مصرف از طریق پیامک
                                                                        </span>
                                                                        {/* <FaAngleLeft className={styles.angleicon} /> */}
                                                                    </button>
                                                                </div>
                                                                {
                                                                    isForget &&
                                                                    <div className='text-center'>
                                                                        <button className={styles.sendcodebtn}>
                                                                            <MdOutlineMail className={styles.mailicon} />
                                                                            <span className={`mx-2 ${styles.texttosend}`}>
                                                                                ارسال کد یکبار مصرف به ایمیل
                                                                            </span>
                                                                            {/* <FaAngleLeft className={styles.angleicon} /> */}
                                                                        </button>
                                                                    </div>
                                                                }

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
                                                </div>
                                            ) :
                                            (
                                                <div className={styles.sendcodeform}>
                                                    <p className={styles.textpassword}>
                                                        رمز یکبار مصرف به شماره زیر ارسال شده است
                                                    </p>
                                                    <div className={styles.sendcodecontent}>
                                                        <p className={styles.userphone}>0913***2345</p>
                                                        <form onSubmit={handleSubmit}>
                                                            <div className={styles.inputpasswordwrap}>
                                                                {Array.from({ length: 4 }).map((value, index) => (
                                                                    <input
                                                                        className={styles.inputpassword}
                                                                        key={index}
                                                                        type="text"
                                                                        maxLength="1"
                                                                        value={value}
                                                                        ref={el => (inputRefs.current[index] = el)}
                                                                        onChange={(e) => handleInputChange(e, index)}
                                                                        onKeyDown={(e) => handleKeyDown(e, index)}

                                                                    />
                                                                ))}
                                                            </div>

                                                            {showResendMessage ? (
                                                                <div className='text-center d-flex justify-content-center'>
                                                                    <p className={`${styles.time} ${styles.againcode}`}>
                                                                        ارسال مجدد
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p className={styles.time}>
                                                                    {formatTime(timeLeft)}
                                                                </p>
                                                            )}

                                                            <div className='mt-5'>
                                                                <button
                                                                    className={`${styles.btnphoneform}`}
                                                                    type='submit'
                                                                >
                                                                    ادامه
                                                                    <FaArrowLeftLong className={styles.iconformphone} />
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )
                                }

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



