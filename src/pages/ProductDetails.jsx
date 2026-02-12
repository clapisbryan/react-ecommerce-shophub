import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '../Store/product/productServices';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct(id);
    }, [id])

    const getProduct = async (id) => {
        try {
            const res = await getSingleProduct(id);
            if (!res) {
                navigate('/');
                return
            }
            console.log(res);
            
            setProduct(res);
        } catch (error) {
            console.log(error);
        }

    }

    if (!product) {
        return <div className="page"><div className="container"><p>Loading...</p></div></div>;
    }

    return (
        <div className='page'>
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </div>
                    <div className='product-detail-content'>
                        <h1 className='product-detail-name'>{product.title}</h1>
                        <p className='product-detail-price'>{product.price}</p>
                        <p className='product-detail-description'>{product.description}</p>
                        <button className='btn btn-primary'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
