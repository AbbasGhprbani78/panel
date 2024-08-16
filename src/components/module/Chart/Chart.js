"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './Chart.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Chart() {
    const [data, setData] = useState([]);
    const router = useRouter();

    const getDataChart = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`,
        };

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/orders-per-month/`, {
                headers,
            });

            if (response.status === 200) {
                setData(response.data);
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.removeItem("refresh")
                localStorage.removeItem("access")
                router.push("/login");
            }
        }
    };

    useEffect(() => {
        getDataChart();
    }, []);

    return (
        <div className={styles.chartcontainer}>
            <p className={styles.titlesole}>فروش در هر ماه</p>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis tickMargin={40} />
                    <Bar dataKey="order_count" fill="#ffcb05" />
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
// app/get-cart-deatil