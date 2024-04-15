import './App.css';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://dummyjson.com/products').then((res) => res.json()).then((resp) => {  
      setData(resp?.products);
    });
  }, []);
  let endIndex=currentPage*10;
  let startIndex=endIndex-10;
  let filteredData=data.slice(startIndex,endIndex);
  const handleCurrentPageData = (crp) => {
    setCurrentPage(crp);
  }

  return (
    <div className="container">
      <div className='products'>
        {filteredData.map((val) => {
          return (
            <div className='product' key={val.id}>
              <img src={val.thumbnail} alt={val.title} />
              <span><strong>{val.title}</strong></span>
              <span>{val.description}</span>
              <span><strong>Price:</strong> {val.price}</span>
              <span><strong>Rating:</strong> {val.rating}</span>
            </div>
          )
        })}
      </div>
      <Pagination totalPage={data.length / 10} handleCurrentPageData={handleCurrentPageData} currentPage={currentPage} />
    </div>
  );
}

export default App;
