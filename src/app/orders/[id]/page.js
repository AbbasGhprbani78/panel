import Orders from '@/components/template/Orders/Orders'
import React from 'react'

export default function page({ params }) {
    const orderid = params.id
    
    return (
        <Orders id={orderid} />
    )
}
