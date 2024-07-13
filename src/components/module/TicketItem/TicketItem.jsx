import React from 'react'
import styles from "@/components/module/TicketItem/TicketItem.module.css"
import { HiOutlineMailOpen } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
export default function TicketItem(Props) {
  return (
    <div className={styles.TicketLine} onClick={Props.onClick}>
      <div>
        <HiOutlineMail className={styles.ticketicon} />
        <span className='fw-bold'>عنوان تیکت</span>
      </div>
      <span>1403/01/02</span>
    </div>
  )
}
