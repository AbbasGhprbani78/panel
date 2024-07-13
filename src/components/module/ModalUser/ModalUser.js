import React from 'react'
import styles from './ModalUser.module.css'
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Input from '../Input/Input';
import Texteara from '../Texteara/Texteara';
import { Formik } from 'formik'
import Select from '../Select/Select';
import { TbBuildingEstate } from "react-icons/tb";

export default function ModalUser({ setShowModal, showModal }) {

    const handleClose = (resetForm) => {
        setShowModal(false);
        resetForm();
    }


    return (

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
                return errors;
            }}

            initialValues={{
                full_name: "",
                phone_number: "",
                email: "",
                address: "",
                state: ""
            }}

            onSubmit={async (values, { setSubmitting }) => {
                console.log(values)
                setSubmitting(false)
            }}
        >
            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting, resetForm }) => (
                <form onSubmit={handleSubmit}>
                    <div className={`${styles.modalcontainer} ${showModal ? styles.show : ''}`}>
                        <div className={styles.modalclose} onClick={() => handleClose(resetForm)}></div>
                        <div className={styles.modalwrappper}>
                            <div className={styles.modalheader}>
                                <FaUser />
                                <span className={styles.infotextm}>اطلاعات من</span>
                            </div>
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
                                <Select
                                    name="state"
                                    label="استان"
                                    icon={TbBuildingEstate}
                                    value={values.state}
                                    onChange={(value) => setFieldValue('state', value)}
                                />
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
                            <div className={styles.btsmodal}>
                                <button type='submit' className={styles.btnconfirm}>تایید اطلاعات</button>
                                <div className={styles.btncancel} onClick={() => handleClose(resetForm)}>لغو</div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

