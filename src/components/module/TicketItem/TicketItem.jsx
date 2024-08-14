import React from 'react'
import styles from "@/components/module/TicketItem/TicketItem.module.css"
import { HiOutlineMailOpen } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
export default function TicketItem({ onClick, ticket }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  return (
    <div className={`${styles.TicketLine} `} onClick={onClick}>
      <div className="d-flex align-items-center">
        {
          ticket.close ?
            <HiOutlineMail className={styles.ticketicon} /> :
            <HiOutlineMailOpen className={styles.ticketicon} />
        }

        <span className='fw-bold'>{ticket?.informations[0]?.title}</span>
        <p className={`fw-bold ${styles.status_ticket} ${ticket.close ? styles.closed : styles.open} mx-4`}>{ticket.close ? "تیکت بسته شد" : "تیکت باز"}</p>
      </div>
      <span>{formatDate(ticket?.informations[0]?.date)}</span>
    </div>
  )
}
