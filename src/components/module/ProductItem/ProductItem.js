'use client'
import React, { useState } from 'react'
import styles from "@/components/module/ProductItem/ProductItem.module.css"
import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
export default function ProductItem() {
  const [addItem, setAddItem] = useState(false)


  return (
    <>
      <div className={styles.ProductItem1}>
        <table class="table text-center " >
          <thead className={styles.thead}>
            <tr >
              <th scope="col" colspan="2"></th>
              <th scope="col" colspan="2" className={styles.Th}>کد کالا</th>
              <th scope="col" colspan="2" className={styles.Th}>شرح محصول</th>
              <th scope="col" colspan="2" className={styles.Th}>مقدار</th>
              <th scope="col" colspan="2"></th>

            </tr>
          </thead>
          <tbody className={styles.Tbody}>
            <tr className={styles.Tr}>
              <td colspan="2" className={styles.Td}>
                <div className={styles.Button} onClick={() => setAddItem(true)}>
                  {
                    addItem ?
                      <>
                        <div className={styles.text}>
                          <span> افزوده شد</span>
                        </div>
                        <div className={styles.icon2}>
                          <FaCheck />
                        </div>
                      </> :
                      <>
                        <div className={styles.text}>
                          <span>افزودن</span>
                        </div>
                        <div className={styles.icon1}>
                          <BsCart2 />
                        </div>
                      </>
                  }
                </div>
              </td>
              <td scope="col" colspan="2" className={styles.Td}>ADFG8745</td>
              <td colspan="2" className={styles.Td}>دستگیره 8400 کروم مشکی مات سوئچی رزت</td>
              <td colspan="2" className={styles.Td}>12/0</td>
              <td colspan="2" className={styles.imageBox}>
                <img src='images/frame 36.png' className={styles.image} />
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.ProductItem2}>
        <div className={styles.Box1}>
          <div className={styles.TitleBox}>
            <span className={styles.TitleDetailes}>شرح محصول</span>
            <span className={styles.detailes}>دستگیره 8400 کروم مشکی مات سوئچی رزت</span>
          </div>
          <div className={styles.imageBox}>
            <img src='images/frame 36.png' />
          </div>
        </div>
        <div className={styles.Box2}>
          <div className={styles.LineBox}>
            <span>کد کالا</span>
            <span>ADFG8745</span>

          </div>
          <div className={styles.LineBox}>
            <span>کارتن</span>
            <span>12</span>
          </div>
          <div className={styles.LineBox}>
            <span>گنجایش کارتن</span>
            <span>12</span>
          </div>
          <div className={styles.LineBox}>
            <span>مقدار</span>
            <span>2</span>
          </div>
        </div>
        <div className={styles.Box3}>
          <div className={styles.Button} onClick={() => setAddItem(true)}>
            {
              addItem ?
                <>
                  <div className={styles.text}>
                    <span> افزوده شد</span>
                  </div>
                  <div className={styles.iconT}>
                    <FaCheck />
                  </div>
                </> :
                <>
                  <div className={styles.text}>
                    <span> افزودن</span>
                  </div>
                  <div className={styles.iconF}>
                    <BsCart2 />
                  </div>
                </>
            }
          </div>

        </div>

      </div >
    </>
  )
}
