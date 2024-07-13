import MainOrder from '@/components/template/Orders/MainOrder'
import React from 'react'

export default function page({ params }) {
    const orderid = params.id

    return (
        <MainOrder id={orderid} />
    )
}
