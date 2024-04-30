import { useEffect, useState } from "react"

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const handleResize = () => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;

}

export default useWindowSize;