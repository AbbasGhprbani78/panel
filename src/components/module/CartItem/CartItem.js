import React from 'react'
import styles from './CartItem.module.css'
import Table from 'react-bootstrap/Table';
import { IoCloseSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
export default function CartItem({ setShowModal }) {
    return (
        <div className={styles.cartItemwrappper}>
            <Table className='text-center'>
                <thead className={styles.headtable}>
                    <tr>
                        <th>< IoCloseSharp className={styles.deleteicon} /></th>
                        <th className={styles.itemhead}>کد کالا</th>
                        <th className={styles.itemhead}>شرح محصول</th>
                        <th className={styles.itemhead}>کارتن</th>
                        <th className={styles.itemhead}>گنجایش کارتن</th>
                        <th className={styles.itemhead}>مقدار</th>
                    </tr>
                </thead>
                <tbody className={styles.bodytable}>
                    <tr >
                        <td>
                            <MdModeEditOutline className={styles.editicon} onClick={() => setShowModal(true)} />
                        </td>
                        <td>
                            ADFG8745
                        </td>
                        <td>
                            دستگیره 8400 کروم مشکی مات سوئچی رزت
                        </td>
                        <td>
                            1/0
                        </td>
                        <td>
                            12/0
                        </td>
                        <td>
                            12/0
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
