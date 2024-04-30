import { useEffect, useState } from 'react';
import './App.css';
import Carousel from './component/Carousel';
import { image } from './component/interface';
import useWindowSize from './component/useWindowSize';
function App() {
  const [loading,setLoading]=useState<boolean>(false);
  const [images,setImages]=useState<image[]>([]);
 const {width,height}=useWindowSize();
  const fetchImages=async (imageLimit:number)=>{
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`);
      const data=await response.json();
      setImages(data);

    } catch (error) {
      console.log("Error in fetching images",error);
    }
    finally{
      setLoading(false);
    }
   
  }

  useEffect(() => {
    fetchImages(8);
  }, [])

  const setCurrentImage=(image:image,index:number)=>{
    console.log(image,index);
  }
  
  return (
    <div className="carousel-container">
        <Carousel images={images}
        isLoading={loading}
        imgPerSlide={1}
        imageLimit={8}
        onImageClick={(image,index)=>setCurrentImage(image,index)}
        customNextButton={(onClick)=><button className="btn next" onClick={onClick} style={{backgroundColor:'gray'}}>▶️</button>}
        //customPrevButton={}
        />

        <div>
          width:{width}
          height:{height}
        </div>
    </div>
  );
}

export default App;
