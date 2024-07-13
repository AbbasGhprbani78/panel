"use client"
import React, { useEffect, useState } from 'react'
import styles from './OrderItem.module.css'
import { Table } from 'react-bootstrap'
export default function OrderItem({ date }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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
    <>
      {
        windowWidth < 600 ?
          <>
            <div className={styles.CartItemmwrapper}>
              <div className={styles.headercart}>
                <div>
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    <p className={styles.carttitle}>شرح محصول</p>
                  </div>
                  <span className={styles.carttext}>دستگیره 8400 کروم مشکی مات سوئچی رزت</span>
                </div>
                <img src="/images/Frame 36.png" alt="" style={{ width: "70px", height: "auto" }} />
              </div>
              <div className={styles.cartinfowrapper}>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>کد کالا</span>
                  <span>ADFG8745</span>
                </div>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>کارتن</span>
                  <span>12</span>
                </div>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>گنجایش کارتن</span>
                  <span>12</span>
                </div>
              </div>
            </div>
          </> :
          <>
            <div className='d-flex flex-column' style={{ marginBottom: "1.3rem" }}>
              <div className={styles.cartItemwrappper} >
                <Table className='text-center'>
                  <thead className={styles.headtable}>
                    <tr>
                      <th className={styles.itemhead}>کد کالا</th>
                      <th className={styles.itemhead}>شرح محصول</th>
                      <th className={styles.itemhead}>کارتن</th>
                      <th className={styles.itemhead}>گنجایش کارتن</th>
                      <th className={styles.itemhead}>مقدار</th>
                      <th className={styles.itemhead}>تصویر</th>
                    </tr>
                  </thead>
                  <tbody className={styles.bodytable}>
                    <tr >
                      <td className={styles.bodyitem}>
                        ADFG8745
                      </td>
                      <td className={styles.bodyitem}>
                        دستگیره 8400 کروم مشکی مات سوئچی رزت
                      </td>
                      <td className={styles.bodyitem}>
                        1/0
                      </td>
                      <td className={styles.bodyitem}>
                        12/0
                      </td>
                      <td className={styles.bodyitem}>
                        12/0
                      </td>
                      <td >
                        <img src="/images/Frame 36.png" alt="" style={{ width: "70px", height: "auto" }} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div >
              <p className='text-start w-100 mb-0 mt-1'>{date}</p>
            </div>

          </>
      }
    </>

  )
}
