import { useEffect, useState } from "react";

interface progerssBarProps {
    value: number,
    onComplete:()=>void

}
const ProgressBar = (({ value = 0 ,onComplete}: progerssBarProps) => {
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        setPercentage(Math.min(100, Math.max(value, 0)));
        if(value>=100){
            onComplete();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className="progress">
            <span style={{ color: percentage > 49 ? "white" : "black" }}>{percentage.toFixed()}%</span>
            <div role="progressbar"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={percentage}
                style={{ width: `${percentage}%` }}></div>
        </div>
    )
});

export default ProgressBar;