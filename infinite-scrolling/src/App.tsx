import React, { useEffect, useState } from 'react';
import './App.css';
import { Products } from './types';

function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Products>({ products: [], total: 0, skip: 0, limit: 100 });
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=${page * 10}`);
      const response = await res.json();
      setProducts(response);
      setPage(page + 1);
    }
    catch (error) {
      console.log("Error occured", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const throttle = (cb: Function, delay: number) => {
    let last = 0;
    return (...args: any) => {
      let now = new Date().getTime();
      if (now - last < delay) return;
      last = now;
      return cb(...args);
    }
  }

  const handleScrolling = throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 500 > document.documentElement.offsetHeight && !loading && products.limit < products.total) {
      fetchProducts();
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => window.removeEventListener('scroll', handleScrolling);
  }, [handleScrolling])

  const { products: allProducts } = products;
  return (
    <div className="container">
      <h1>Products</h1>
      <div className='products_container'>
        {allProducts.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <span>{product.title}</span>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
