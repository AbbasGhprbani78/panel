"use client"
import React, { useEffect, useState, useContext } from 'react'
import styles from "@/styles/Products.module.css"
import SideBar from '@/components/module/SideBar/SideBar'
import Header from '@/components/module/Header/Header'
import SearchBox from '@/components/module/SearchBox/SearchBox'
import { IoIosArrowBack } from "react-icons/io";
import ProductItem from '@/components/module/ProductItem/ProductItem'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ModalBuy from '@/components/module/ModalBuy/ModalBuy'
import { CountContext } from '@/context/CartContext'

export default function Products() {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [showmodal, setShowmodal] = useState(false)
    const [value, setValue] = useState(1)
    const [showModalBuy, setShowModalBuy] = useState(false)
    const [mainProduct, setMainProduct] = useState("")
    const [products, setProducts] = useState("")
    const [filterProduct, setFilterProduct] = useState([])
    const { setCountProduct } = useContext(CountContext)
    console.log(mainProduct.id)

    const gotocart = () => {
        router.replace("/cart")
    }


    const getAllProducts = async () => {

        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/app/get-products/`, {
                headers,
            })

            if (response.status === 200) {
                setProducts(response.data)
            }

        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear()
                router.push("/login")
            }
        }
    }

    const addToCartHandler = () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart)

        if (cart.length) {
            const isInCart = cart.some(item => item.id == mainProduct.id);

            if (isInCart) {
                cart.forEach((item) => {
                    if (item.id == mainProduct.id) {
                        item.count = Number(item.count) + Number(value);
                    }
                });
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product added to cart successfully");
            } else {
                
                const cartItem = {
                    id: mainProduct.id,
                    count: Number(value),
                    description: mainProduct.descriptions,
                    img: mainProduct.image
                };

                cart.push(cartItem);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product added to cart successfully");
            }
        }
        else {
            const cartItem = {
                id: mainProduct.id,
                count: Number(value),
                description: mainProduct.descriptions,
                img: mainProduct.image
            };

            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart successfully");
        }

        const countproduct = JSON.parse(localStorage.getItem('cart')).length
        setCountProduct(countproduct)
        setShowModalBuy(false)
    }


    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <>

            <div className={styles.wrapperpage}>
                <SideBar />
                <div className={styles.pagecontent}>
                    <ModalBuy
                        showModalBuy={showModalBuy}
                        setShowModalBuy={setShowModalBuy}
                        value={value}
                        setValue={setValue}
                        addToCartHandler={addToCartHandler}
                    />

                    <div className={`${styles.modalcontainer} ${showmodal ? styles.show : ""}`}>
                        <div className={styles.modalhide} onClick={() => setShowmodal(false)}></div>
                        <div className={styles.modalcontent}>
                            <p>هنوز محصولی به سبدخرید اضافه نکرده اید</p>
                            <button className={styles.modalbtn} onClick={() => setShowmodal(false)}>متوجه شدم</button>
                        </div>
                    </div>
                    <Header title={"محصولات"} />
                    <div className={styles.maincontent}>
                        <div className={styles.wrapper}>
                            <SearchBox
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className={styles.ProductsPage}>
                            <div className={styles.ProductsBox}>

                                {
                                    products.length > 0 &&
                                    products.map(product => (
                                        <ProductItem
                                            product={product}
                                            key={product.id}
                                            setShowModalBuy={setShowModalBuy}
                                            setMainProduct={setMainProduct}

                                        />

                                    ))
                                }

                            </div>
                            <div>
                                <button className={styles.ButtonBox} onClick={gotocart}>
                                    <span>ادامه</span>
                                    <IoIosArrowBack />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


//app/add-product