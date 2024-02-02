import React from 'react'
import "./Product.css";

const Product = ({product}) => {
  return (
    <div className='card'>
        <img src={product.images[0]} alt="" />
        <div className='card-info'>
            <h3>{product.title}</h3>
            <h4>Brand: {product.brand}</h4>
            <h3>{product.description}</h3>
            <h2>₹ {product.price}</h2>
        </div>
    </div>
  )
}

export default Product