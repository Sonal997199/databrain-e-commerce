import React, { useState, useEffect} from 'react'
import axios from 'axios'
import './Products.css';
import Product from './Product/Product';

const Products = () => {
  const [products,setProducts] = useState([]);
  const [filterProducts,setFilterProducts] = useState([]);
  const [filter,setFilter] = useState("all");
  const [sortBy,setSortBy] = useState("");

  useEffect(() => {
    axios
    .get("https://dummyjson.com/products")
    .then((response) => setProducts(response.data.products))
    .catch((error) => console.log(error));
  },[]);

  const handleFilter = (e) =>{
    if(e.target.value === "all"){
        setFilter(e.target.value);
        setFilterProducts([]);
        return;
    }
    setFilter(e.target.value);
    const newProducts = products.filter(
        (product) => product["category"] === e.target.value
    );
    setFilterProducts(newProducts);
  };

  const handleSortBy = (e) =>{
    const sortBy = e.target.value;
    setSortBy(e.target.value);
    if(filterProducts.length>0){
        const newProducts = filterProducts.sort(function(a,b){
            return a[sortBy]-b[sortBy];
        });
        setFilterProducts(newProducts);
    }
    else{
        const newProducts = products.sort(function(a,b) {
            return a[sortBy]-b[sortBy];
        });
        setProducts(newProducts);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='filter-container'>
            <label htmlFor="cars">Filter By: </label>
            <select value={filter} onChange={handleFilter} name="filter" id="filter">
                <option value="all">All</option>
                <option value="smartphones">Smartphones</option>
                <option value="groceries">Groceries</option>
                <option value="skincare">Skincare</option>
                <option value="laptops">Laptops</option>
                <option value="home-decoration">Home Decoration</option>
            </select>
        </div>
        <div className='sortBy-container'>
            <label htmlFor="cars">Sort By: </label>
            <select value={sortBy} onChange={handleSortBy} name="sort" id="sort">
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
            </select>
        </div>
      </div>

      <div className='products-container'>
        {filterProducts.length>0 ? filterProducts.map((product) => (
            <Product key={product.id} product={product} />
        )):
        products.map((product)=>(
            <Product key={product.id} product={product} />
        ))}
      </div>
    </> 
  );
}

export default Products