import React from 'react'
import styles from "@/components/module/TicketItem/TicketItem.module.css"
export default function TicketItem(Props) {
  return (
    <div className={styles.TicketLine} onClick={Props.onClick}>
      <span>عنوان تیکت</span>
      <span>1403/01/02</span>
    </div>
  )
}
