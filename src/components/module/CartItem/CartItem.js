import React from 'react'
import styles from './CartItem.module.css'
import Table from 'react-bootstrap/Table';
import { IoCloseSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
export default function CartItem({ setShowModalBuy, isConfirmation, setShowDeleteModal }) {
    return (
        <div className={styles.cartItemwrappper}>
            <Table className='text-center'>
                <thead className={styles.headtable}>
                    <tr>
                        {
                            !isConfirmation &&
                            <th>< IoCloseSharp className={styles.deleteicon} onClick={() => setShowDeleteModal(true)} /></th>
                        }

                        <th className={styles.itemhead}>کد کالا</th>
                        <th className={styles.itemhead}>شرح محصول</th>
                        <th className={styles.itemhead}>کارتن</th>
                        <th className={styles.itemhead}>گنجایش کارتن</th>
                        <th className={styles.itemhead}>مقدار</th>
                    </tr>
                </thead>
                <tbody className={styles.bodytable}>
                    <tr >
                        {
                            !isConfirmation &&
                            <td>
                                <MdModeEditOutline className={styles.editicon} onClick={() => setShowModalBuy(true)} />
                            </td>
                        }

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
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
