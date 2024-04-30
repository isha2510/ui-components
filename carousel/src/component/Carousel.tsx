import { useEffect, useRef, useState } from "react"
import { image } from "./interface"

interface CarouselProps {
    images: image[],
    isLoading: boolean
    imageLimit: number,
    imgPerSlide: number,
    onImageClick:(image:image,index:number)=>void,
    customNextButton:(gotToNext:()=>void)=>React.ReactNode
}

const Carousel = ({ images = [], isLoading = false, imageLimit = images.length, imgPerSlide = 1,onImageClick,customNextButton}: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [imgWidth, setImgWidth] = useState<number>(0);
    const imgRef = useRef<HTMLImageElement>(null);
    console.log(imgRef?.current?.offsetWidth)
    useEffect(() => {
        setCurrentIndex(0);
    }, [images])
    const gotToNext = () => {
        setCurrentIndex(prevIndx => prevIndx === images.length - 1 ? 0 : prevIndx + 1);
    }
    const gotToPrev = () => {
        setCurrentIndex(prevIndx => prevIndx === 0 ? images.length - 1 : prevIndx - 1);
    }
    return (
        <>
            {isLoading ? <div>isLoading...</div> :
                <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
                    <div className="image-container" style={{transform:`translateX(-${currentIndex*imgWidth}px)`}}>
                        {images.slice(0, imageLimit > images.length ? images.length : imageLimit).map((image,index) => (
                            <img
                                onLoad={() => setImgWidth(imgRef.current? imgRef?.current?.offsetWidth : 0)}
                                ref={imgRef}
                                key={image.id}
                                src={image.url}
                                alt={image.title}
                                className="image"
                                onClick={()=>onImageClick(image,index)}
                            />
                        ))}
                    </div>
                    
                    <button className="btn prev" onClick={gotToPrev}>◀️</button>
                    {customNextButton instanceof Function? customNextButton(gotToNext): <button className="btn next" onClick={gotToNext}>▶️</button>}
                   
                </div>
            }
        </>
    )
}

export default Carousel;