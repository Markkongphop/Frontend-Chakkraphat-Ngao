'use client'
import { useState } from "react";
import Image from "next/image";
import styles from "./card.module.css" 
import InteractiveCard from "./InteractiveCard";
import Rating from '@mui/material/Rating';

export default function Card({venueName, imgSrc, onRating}:{venueName:string,imgSrc:string,onRating?:Function}){
    const [value, setValue] = useState<number | null>(0);
    
    return(

        <InteractiveCard contentName={venueName}>  

        <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc} 
                    alt='venue'
                    fill={true}
                    className='object-cover rounded-t-lg'/>
        </div>

        <div className='w-full h-[15%] p-[10px] text-black '>{venueName}</div>
        
        {
            onRating ? <Rating name={`${venueName} Rating`}  value={value} id={`${venueName} Rating`} data-testid={`${venueName} Rating`}
            onChange={(event, newValue) => {setValue(newValue); onRating(venueName,newValue)}}/> : ''
        }
        

        </InteractiveCard>
    )
}