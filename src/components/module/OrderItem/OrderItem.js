"use client"
import React, { useEffect, useState } from 'react'
import styles from './OrderItem.module.css'
import { Table } from 'react-bootstrap'
export default function OrderItem({ item }) {

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
              <div className={styles.imageorder_wrapper}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.product?.image}`} alt="" />
              </div>
              <div className='mt-4'>
                <span className={styles.carttext}> {item?.product?.descriptions}</span>
              </div >
              <div className={styles.cartinfowrapper}>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>کد کالا</span>
                  <span> {item?.product?.item_code}</span>
                </div>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>مقدار</span>
                  <span>{item?.number_sold}</span>
                </div>
                <div className={styles.cartinfoitem}>
                  <span className={styles.infoitem}>واحد {`(${item?.product?.specifications[0]?.property_name})`}</span>
                  <span> {item?.product?.specifications[0]?.value}</span>
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
                      <th className={styles.itemhead}>مقدار</th>
                      <th className={styles.itemhead}>واحد {`(${item?.product?.specifications[0]?.property_name})`}</th>
                      <th className={styles.itemhead}>تصویر</th>
                    </tr>
                  </thead>
                  <tbody className={styles.bodytable}>
                    <tr >
                      <td className={styles.bodyitem}>
                        {item?.product?.item_code}
                      </td>
                      <td className={styles.bodyitem}>
                        {item?.product?.descriptions}
                      </td>
                      <td className={styles.bodyitem}>
                        {item?.number_sold}
                      </td>
                      <td className={styles.bodyitem}>
                        {item?.product?.specifications[0]?.value}
                      </td>
                      <td >
                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.product?.image}`} alt="" style={{ width: "70px", height: "auto" }} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div >
            </div>

          </>
      }
    </>

  )
}




