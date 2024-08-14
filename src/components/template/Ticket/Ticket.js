'use client'
import React, { useEffect, useState } from 'react'
import styles from "@/styles/Ticket.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import { GoPlus } from "react-icons/go";
import { SlSocialDropbox } from "react-icons/sl";
import TicketItem from '@/components/module/TicketItem/TicketItem'
import Massage from '@/components/module/Massage/Massage'
import { FaFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from 'axios'
import swal from 'sweetalert'
export default function Ticket() {

  const [tab, setTab] = useState(1)
  const [tickets, setTickets] = useState([0])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [title, SetTitle] = useState("")
  const [text, setText] = useState("")
  const [file, setFile] = useState("")
  const [check, setCheck] = useState(false)
  const [disable, SetDisable] = useState(false)
  const [allTickets, setAllTickets] = useState([])


  const sendTicket = async () => {

    if (!title.trim() || !text.trim()) {
      swal({
        title: "عنوان و متن پیام نمی‌توانند خالی باشند",
        icon: "error",
        button: "باشه"
      });
      return;
    }
    SetDisable(true)

    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const formData = new FormData()
    formData.append("title", title)
    formData.append("message", text)

    if (file) {
      formData.append("file", file)
    }

    if (check) {
      formData.append("alarm", check)
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/send-ticket/`, formData, {
        headers,
      })

      if (response.status === 201) {
        swal({
          title: "تیکت با موفقیت انجام  شد",
          icon: "success",
          button: {
            text: "باشه",
            className: "swal-button-center",
          }
        })

        SetTitle("")
        setText("")
        setFile("")
        setCheck(false)
        SetDisable(false)
      }

    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem("refresh")
        localStorage.removeItem("access")
        router.push("/login")
      }
      SetDisable(false)
    }
  }

  const getAllTicket = async () => {

    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat//`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response.data)
      }

    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem("refresh")
        localStorage.removeItem("access")
        router.push("/login")
      }
    }
  }


  useEffect(() => {
    getAllTicket()
  }, [])

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
    <div className={styles.wrapperpage}>
      <SideBar />
      <div className={styles.pagecontent}>
        <Header title={"تیکت ها"} />
        <div className={styles.maincontent}>
          {
            windowWidth < 900 ?
              <>
                <div className={styles.ButtonBox}>
                  <div className={`${styles.Button} ${tab === 2 ? styles.activetab : ""}`} onClick={() => setTab(2)}>
                    <span>ارسال تیکت جدید</span>
                    <GoPlus style={{ marginRight: "5px" }} />
                  </div>
                  <div className={`${styles.Button} ${tab === 1 || tab === 3 ? styles.activetab : ""}`} onClick={() => setTab(1)}>
                    <span>تیکت ها</span>
                  </div>
                </div>
                <div className={styles.TabBox}>
                  <div className={styles.Box}>
                    {
                      tab === 1 &&
                      <div>
                        {
                          tickets.length > 0 ?

                            <div className={styles.TicketListBox}>
                              <div className={styles.text}>
                                <span>تعداد کل تیکت‌ها: 0 </span>
                                <span>تیکت‌های باز: 0</span>
                              </div>
                              <div className={styles.TicketItemBox}>
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                                <TicketItem onClick={() => setTab(3)} />
                              </div>
                            </div>
                            :
                            <>
                              <SlSocialDropbox />
                              <span>
                                موردی یافت نشد
                              </span>
                            </>
                        }
                      </div>
                    }

                    <div className={`${tab === 2 ? styles.InputBox : styles.noneBox}`}>
                      <div className={styles.ChildrenBox}>
                        <div className={styles.title}>
                          <span>درخواست خود را به صورت یک تیکت مطرح کنید تا کارشناسان ما در اسرع وقت، به آن پاسخ دهند.</span>
                        </div>
                        <div>
                          <div className={styles.InputTitle}>
                            <input placeholder='عنوان' />
                          </div>
                          <div className={styles.InputText}>
                            <span>متن پیام</span>
                            <div className={styles.TextareaBox}>
                              <textarea />
                            </div>
                            <div className={styles.OptionButton}>
                              <div className={`${styles.checkbox} my-4`}>
                                <input type='checkbox' />
                                <span>هنگام پاسخ من را از طریق پیامک مطلع کن.</span>
                              </div>
                              <label htmlFor="file" className={styles.file}>
                                بارگذاری فایل
                                <input type="file" id="file" style={{ display: "none" }} />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className={styles.ButtonBox2}>
                          <div className={styles.Button1}>ارسال تیکت</div>
                        </div>
                      </div>

                    </div>

                    <div className={`${tab === 3 ? styles.TicketMassageBox : styles.noneBox}`}>
                      <div className={styles.MassageBox}>
                        <Massage sender={true} />
                        <Massage sender={false} />
                        <Massage sender={true} />
                        <Massage sender={false} />
                        <Massage sender={true} />
                        <Massage sender={false} />
                        <Massage sender={true} />
                        <Massage sender={false} />
                        <Massage sender={true} />
                        <Massage sender={false} />
                        <Massage sender={false} />
                      </div>
                    </div>

                  </div>
                </div>
              </> :
              <>

                <div className={styles.ButtonBox}>
                  <div className={`${styles.Button1} ${tab === 1 || tab === 3 ? styles.activetab : ""}`} onClick={() => setTab(1)}>
                    <span>تیکت ها</span>
                  </div>
                  <div className={`${styles.Button2} ${tab === 2 ? styles.activetab : ""}`} onClick={() => setTab(2)}>
                    <span>ارسال تیکت جدید</span>
                    <GoPlus style={{ marginRight: "5px" }} />
                  </div>
                </div>
                {
                  tab === 1 &&
                  <div>
                    {
                      tickets.length > 0 ?

                        <div className={styles.TicketListBox}>
                          <div className={styles.text}>
                            <span>تعداد کل تیکت‌ها: 0 </span>
                            <span>تیکت‌های باز: 0</span>
                          </div>
                          <div className={styles.TicketItemBox}>
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                            <TicketItem onClick={() => setTab(3)} />
                          </div>
                        </div>
                        :
                        <>
                          <SlSocialDropbox />
                          <span>
                            موردی یافت نشد
                          </span>
                        </>
                    }
                  </div>
                }
                <div className={`${tab === 2 ? styles.createTicket : styles.noneBox}`}>
                  <div className={styles.newtticket}>
                    <div className={styles.title}>
                      <span>درخواست خود را به صورت یک تیکت مطرح کنید تا کارشناسان ما در اسرع وقت، به آن پاسخ دهند.</span>
                    </div>
                    <div>
                      <div className={styles.InputTitle}>
                        <input
                          placeholder='عنوان'
                          value={title}
                          onChange={e => SetTitle(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className={styles.InputText}>
                        <span>متن پیام</span>
                        <div className={styles.TextareaBox}>
                          <textarea
                            style={{ outline: "none", }}
                            value={text}
                            onChange={e => setText(e.target.value)}
                          />
                        </div>
                        <div className={styles.OptionButton}>
                          <div className={`${styles.checkbox} mt-4`} >
                            <input
                              type='checkbox'
                              checked={check}
                              onChange={e => setCheck(e.target.checked)}
                            />
                            <span>هنگام پاسخ من را از طریق پیامک مطلع کن.</span>
                          </div>
                          <label htmlFor="file" className={styles.file}>
                            {
                              file ?
                                <FaFileAlt /> :
                                <>
                                  بارگذاری فایل
                                </>
                            }
                            <input
                              type="file"
                              id="file"
                              style={{ display: "none" }}
                              onChange={e => setFile(e.target.files[0])}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={styles.ButtonBox2} >
                      <button
                        disabled={disable}
                        className={styles.Buttonsend}
                        onClick={sendTicket}
                      >ارسال تیکت</button>
                    </div>
                  </div>
                </div>
                <div className={`${tab === 3 ? styles.TicketMassageBox : styles.noneBox}`}>
                  <div className={styles.MassageBox}>
                    <Massage sender={true} />
                    <Massage sender={false} />
                    <Massage sender={true} />
                    <Massage sender={false} />
                    <Massage sender={true} />
                    <Massage sender={false} />
                    <Massage sender={true} />
                    <Massage sender={false} />
                    <Massage sender={true} />
                    <Massage sender={false} />
                    <Massage sender={false} />
                  </div>
                  <div className={styles.input_ticket_wrap}>
                    <input className={styles.input_ticket} type="text" />
                    <IoSend className={styles.iconsend} />
                  </div>
                </div>

              </>
          }
        </div>
      </div>
    </div>
  )
}





const data = [

]