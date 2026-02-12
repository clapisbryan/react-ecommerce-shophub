import axios from "axios"
import { useEffect, useState } from "react";
import { getProduct } from "../Store/product/productServices";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const data = await getProduct();
            setProducts(data.products)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="page">
            <div className="home-hero">
                <h1 className="home-title">Welcome to shophub</h1>
                <p className="home-subtitle">Discover amazing products at great prices</p>
            </div>
            <div className="container">
                <h2 className="page-title">Our Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
