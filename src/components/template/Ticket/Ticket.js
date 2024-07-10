'use client'
import React, { useState } from 'react'
import styles from "@/styles/Ticket.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import { GoPlus } from "react-icons/go";
import { SlSocialDropbox } from "react-icons/sl";
import TicketItem from '@/components/module/TicketItem/TicketItem'
import Massage from '@/components/module/Massage/Massage'
export default function Ticket() {
  const [tab, setTab] = useState(1)
  const [tickets, setTickets] = useState([])

  return (
    <div className={styles.wrapperpage}>
      <SideBar />
      <div className={styles.pagecontent1}>
        <Header title={"تیکت"} />
        <div className={styles.maincontent}>

          <div className={styles.ButtonBox}>
            <div className={styles.Button} onClick={() => setTab(2)}>
              <span>ارسال تیکت جدید</span>
              <GoPlus />
            </div>
            <div className={styles.Button} onClick={() => setTab(3)}>
              <span>تیکت ها</span>

            </div>
          </div>
          <div className={styles.TabBox}>
            <div className={styles.Box}>
              <div className={`${tab === 1 ? styles.WhthoutTicket : styles.noneBox}`}>
                <SlSocialDropbox />
                <span>
                  موردی یافت نشد
                </span>
              </div>
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
                        <div className={styles.checkbox}>
                          <input type='checkbox' />
                          <span>هنگام پاسخ من را از طریق پیامک مطلع کن.</span>
                        </div>
                        <div className={styles.Button}>
                          <span className={styles.FileButton}>بارگذاری فایل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ButtonBox2}>
                    <div className={styles.Button1}>ارسال تیکت</div>
                  </div>
                </div>

              </div>
              <div className={`${tab === 3 ? styles.TicketList : styles.noneBox}`}>
                <div className={styles.TicketListBox}>
                  <div className={styles.text}>
                    <span>تعداد کل تیکت‌ها: 0 </span>
                    <span>تیکت‌های باز: 0</span>
                  </div>
                  <div className={styles.TicketItemBox}>
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                    <TicketItem onClick={() => setTab(4)} />
                  </div>
                </div>
              </div>
              <div className={`${tab === 4 ? styles.ChatBox : styles.noneBox}`}>
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
        </div>
      </div>
      <div className={styles.pagecontent2}>
        <Header title={"تیکت"} />
        <div className={styles.maincontent}>
          <div className={styles.ButtonBox}>
            <div className={styles.Button1} onClick={() => setTab(2)}>
              <span>تیکت ها</span>
            </div>
            <div className={styles.Button2} onClick={() => setTab(3)}>
              <span>ارسال تیکت جدید</span>
              <GoPlus />
            </div>
          </div>
          <div className={`${tab === 1 ? styles.withOutTicket : styles.noneBox}`}>
            <SlSocialDropbox />
            <span>
              موردی یافت نشد
            </span>
          </div>
          <div className={`${tab === 2 ? styles.ticketList : styles.noneBox}`}>
            <div className={styles.TicketListBox}>
              <div className={styles.text}>
                <span>تعداد کل تیکت‌ها : 0 </span>
                <span>تیکت‌های باز : 0</span>
              </div>
              <div className={styles.TicketItemBox}>
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
                <TicketItem onClick={() => setTab(4)} />
              </div>
            </div>
          </div>
          <div className={`${tab === 3 ? styles.createTicket : styles.noneBox}`}>
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
                  <div className={styles.Buttonfile}>
                    <span className={styles.FileButton}>بارگذاری فایل</span>
                  </div>
                  <div className={styles.checkbox}>

                    <input type='checkbox' />
                    <span>هنگام پاسخ من را از طریق پیامک مطلع کن.</span>
                  </div>

                </div>
              </div>
            </div>
            <div className={styles.ButtonBox2}>
              <div className={styles.Buttonsend}>ارسال تیکت</div>
            </div>

          </div>
          <div className={`${tab === 4 ? styles.TicketMassageBox : styles.noneBox}`}>
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
    </div>
  )
}
