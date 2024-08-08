"use client"
import { createContext, useEffect, useState } from "react";

export const CountContext = createContext()

export function CountProvaider({ children }) {

    const [countProduct, setCountProduct] = useState(0)

    useEffect(() => {
        const countproductlenght = JSON.parse(localStorage.getItem('cart'))?.length
        setCountProduct(countproductlenght)
    }, [])



    return (
        <CountContext.Provider value={{ countProduct, setCountProduct }}>
            {children}
        </CountContext.Provider>
    )
}