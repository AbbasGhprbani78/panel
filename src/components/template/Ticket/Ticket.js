'use client'
import React, { useEffect, useState, useRef } from 'react'
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
import { useRouter } from 'next/navigation';
import { MdAttachFile } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
export default function Ticket() {

  const [tab, setTab] = useState(1)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [title, SetTitle] = useState("")
  const [text, setText] = useState("")
  const [file, setFile] = useState("")
  const [check, setCheck] = useState(false)
  const [disable, SetDisable] = useState(false)
  const [allTickets, setAllTickets] = useState([])
  const [openTicket, setOpenTicket] = useState(0)
  const [selectedTicket, setSelectedTicket] = useState([])
  const [textInput, setTextInput] = useState("")
  const router = useRouter()
  const [ticket, setTicket] = useState("")
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const messageEndRef = useRef(null);
  const [showfile, setShowFile] = useState(false)


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
          title: "تیکت با موفقیت ارسال شد",
          icon: "success",
          button: {
            text: "باشه",
            className: "swal-button-center",
          }
        }).then(() => {
          window.location.reload();
        });

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/get-ticket/`, {
        headers,
      })

      if (response.status === 200) {
        setAllTickets(response.data)
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

  const getSelectedTicket = async (ticket) => {
    setTicket(ticket)
    setSelectedTicket(ticket.informations)
    setTab(3)
  }

  const sendmessage = async () => {
    if (textInput.trim()) {
      const access = localStorage.getItem("access")
      const headers = {
        Authorization: `Bearer ${access}`
      };

      const formData = new FormData()
      formData.append("message", textInput)
      formData.append("ticket_id", ticket.ticket_id)

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/send-ticket/`, formData, {
          headers,
        })

        if (response.status === 201) {

          const newMessage = {
            message: textInput,
            date: new Date(),
            is_admin: false
          }

          selectedTicket.push(newMessage)

          swal({
            title: "تیکت با موفقیت ارسال  شد",
            icon: "success",
            button: {
              text: "باشه",
            }
          })
          if (messageEndRef.current) {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
          setTextInput("")

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
  }

  const sendFile = async (e) => {
    setShowFile(true)
    const access = localStorage.getItem("access")
    const fileMessage = e.target.files[0]
    const formData = new FormData()
    formData.append("ticket_id", ticket.ticket_id)
    formData.append("file", fileMessage)

    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/send-ticket/`, formData, {
        headers,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadPercentage(progress);
        },
      })

      if (response.status === 201) {

        setShowFile(false)
        const newMessage = {
          file: URL.createObjectURL(fileMessage),
          date: new Date(),
          is_admin: false
        }

        setSelectedTicket(prevMessages => [...prevMessages, newMessage]);
        swal({
          title: "تیکت با موفقیت ارسال  شد",
          icon: "success",
          button: {
            text: "باشه",
          }
        })
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftkey) {
      event.preventDefault()
      sendmessage()
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


  useEffect(() => {
    const allOpenTicket = allTickets?.filter(ticket => ticket.close == false)
    setOpenTicket(allOpenTicket.length)
  }, [allTickets])

  return (
    <div className={styles.wrapperpage}>
      <SideBar />
      <div className={styles.pagecontent}>
        <Header title={"تیکت ها"} />
        <div className={styles.maincontent}>
          {
            windowWidth < 1025 ?
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
                      <div className={styles.allTickets}>
                        {
                          allTickets.length > 0 ?

                            <div className={styles.TicketListBox}>
                              <div className={styles.text}>
                                <span>تعداد کل تیکت‌ها: {allTickets.length} </span>
                                <span>تیکت‌های باز: {openTicket}</span>
                              </div>
                              <div className={styles.TicketItemBox}>
                                {
                                  allTickets.map(ticket => (
                                    <TicketItem
                                      onClick={() => getSelectedTicket(ticket)}
                                      key={ticket.ticket_id}
                                      ticket={ticket}
                                    />
                                  ))
                                }

                              </div>
                            </div>
                            :
                            <>
                              <div className={styles.none_ticket}>
                                <SlSocialDropbox className={styles.icon_ticket_none} />
                                <p className={styles.ticket_text_none}>
                                  موردی یافت نشد
                                </p>
                              </div>
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
                                value={text}
                                onChange={e => setText(e.target.value)}
                              />
                            </div>
                            <div className={styles.OptionButton}>
                              <div className={`${styles.checkbox} my-4`}>
                                <input
                                  type='checkbox'
                                  checked={check}
                                  onChange={e => setCheck(e.target.checked)}
                                />
                                <span>هنگام پاسخ من را از طریق پیامک مطلع کن.</span>
                              </div>
                              <label
                                htmlFor="file" className={styles.file}>
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
                        <div className={styles.ButtonBox2}>
                          <button className={styles.Button1} onClick={sendTicket}>ارسال تیکت</button>
                        </div>
                      </div>

                    </div>

                    <div className={`${tab === 3 ? styles.TicketMassageBox : styles.noneBox}`}>
                      <div className={styles.MassageBox}>
                        {
                          selectedTicket.length > 0 &&
                          selectedTicket.map(ticket => (
                            <Massage key={ticket?.ticket_id} tikectmsg={ticket} />
                          ))
                        }
                        {
                          showfile &&
                          <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                            <div className='file-content' style={{ position: "relative" }}>
                              <a className='place' href="#" target='blank' download>
                                <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                              </a>
                              <div className='progress-upload'>
                                <div style={{ width: "55px", height: "55px" }}>
                                  <CircularProgressbar
                                    minValue={0}
                                    maxValue={100}
                                    value={uploadPercentage}
                                    strokeWidth={5}
                                    background={false}
                                    styles={{
                                      path: {
                                        stroke: `#45ABE5`,
                                      },
                                      trail: {
                                        stroke: "#ffffff",
                                      },
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      <div className={styles.wrapinpt_m}>
                        <div className={styles.file_wrapper}>
                          <label htmlFor="file" className={styles.labelfile}>
                            <MdAttachFile className={styles.fileicon_m} />
                          </label>
                          <input
                            type="file"
                            id="file"
                            onChange={(e) => sendFile(e)}
                            className={styles.input_tick}
                          />
                        </div>
                        <div className={styles.input_ticket_wrap}>
                          <input
                            className={styles.input_ticket}
                            type="text"
                            value={textInput}
                            onChange={e => setTextInput(e.target.value)}
                          />
                          <IoSend className={styles.iconsend} onClick={sendmessage} />
                        </div>
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
                      allTickets.length > 0 ?
                        <div className={styles.TicketListBox}>
                          <div className={styles.text}>
                            <span>تعداد کل تیکت‌ها: {allTickets.length} </span>
                            <span>تیکت‌های باز: {openTicket}</span>
                          </div>
                          <div className={styles.TicketItemBox}>
                            {
                              allTickets.map(ticket => (
                                <TicketItem
                                  onClick={() => getSelectedTicket(ticket)}
                                  key={ticket.ticket_id}
                                  ticket={ticket}
                                />
                              ))
                            }
                          </div>
                        </div>
                        :
                        <div className={styles.none_ticket}>
                          <SlSocialDropbox className={styles.icon_ticket_none} />
                          <p className={styles.ticket_text_none}>
                            موردی یافت نشد
                          </p>
                        </div>
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
                <div className={`${tab === 3 ? styles.TicketMassageBox : styles.noneBox}`}  >
                  <div className={styles.MassageBox}>
                    {
                      selectedTicket.length > 0 &&
                      selectedTicket.map(ticket => (
                        <Massage key={ticket?.ticket_id} tikectmsg={ticket} />
                      ))
                    }
                    {
                      showfile &&
                      <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                        <div className='file-content' style={{ position: "relative" }}>
                          <a className='place' href="#" target='blank' download>
                            <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                          </a>
                          <div className='progress-upload'>
                            <div style={{ width: "55px", height: "55px" }}>
                              <CircularProgressbar
                                minValue={0}
                                maxValue={100}
                                value={uploadPercentage}
                                strokeWidth={5}
                                background={false}
                                styles={{
                                  path: {
                                    stroke: `#45ABE5`,
                                  },
                                  trail: {
                                    stroke: "#ffffff",
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                  <div className={styles.input_message_p}>
                    <div className={styles.file_wrapper}>
                      <label htmlFor="file" className={styles.labelfile}>
                        <MdAttachFile className={styles.fileicon_m} />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => sendFile(e)}
                        className={styles.input_tick}
                      />
                    </div>

                    <div className={styles.input_ticket_wrap}>
                      <input
                        onKeyDown={handleKeyDown}
                        className={styles.input_ticket}
                        type="text"
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                      />
                      <IoSend className={styles.iconsend} onClick={sendmessage} />
                    </div>
                  </div>
                  <div ref={messageEndRef} />
                </div>
              </>
          }
        </div>
      </div>
    </div>
  )
}



