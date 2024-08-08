
import React from 'react'
import styles from "@/components/module/ProductItem/ProductItem.module.css"
import { BsCart2 } from "react-icons/bs";

export default function ProductItem({ setShowModalBuy, product, setMainProduct }) {

  return (
    <>

      <div className={styles.ProductItem1}>
        <table class="table text-center " >
          <thead className={styles.thead}>
            <tr >
              <th scope="col" colspan="2"></th>
              <th scope="col" colspan="2" className={styles.Th}>کد کالا</th>
              <th scope="col" colspan="2" className={styles.Th}>شرح محصول</th>
              <th scope="col" colspan="2"></th>

            </tr>
          </thead>
          <tbody className={styles.Tbody}>
            <tr className={styles.Tr}>
              <td colspan="2" className={styles.Td}>
                <div className={styles.Button} onClick={() => {
                  setShowModalBuy(true)
                  setMainProduct(product)
                }}>
                  <div className={styles.text}>
                    <span>افزودن</span>
                  </div>
                  <div className={styles.icon1}>
                    <BsCart2 style={{ fontSize: "1rem" }} />
                  </div>
                </div>
              </td>
              <td scope="col" colspan="2" className={styles.Td}>{product.code}</td>
              <td colspan="2" className={styles.Td}>{product.description}</td>
              <td colspan="2" className={styles.imageBox}>
                <img src={product.img} className={styles.image} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.ProductItem2}>
        <div className={styles.imagecart}>
          <img src={product.img} alt="product" />
        </div>
        <div className='d-flex align-items-center justify-content-between mt-3'>
          <span>کد کالا</span>
          <span>{product.code}</span>
        </div>
        <p className={styles.product_des}>{product.description}</p>
        <div className={styles.Box3}>
          <div className={styles.Button} onClick={() => {
            setShowModalBuy(true)
            setMainProduct(product)
          }}>
            <div className={styles.text}>
              <span> افزودن</span>
            </div>
            <div className={styles.iconF}>
              <BsCart2 />
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

{/* <div className={styles.text}>
                    <span> افزوده شد</span>
                  </div>
                  <div className={styles.iconT}>
                    <FaCheck />
                  </div> */}