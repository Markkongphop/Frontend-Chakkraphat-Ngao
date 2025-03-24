'use client'

import { useEffect, useReducer, useState } from "react"
import Card from "./Card"
import {  Link } from "@mui/material";
import { useRef } from "react";
import { VenueJson,VenueItem } from "../../interface";
import getVenues from "@/libs/getVenues";

export default function CardPanel(){

    const [venueResponse, setVenueResponse] = useState<VenueJson|null>(null)
    const countRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const fetchData = async() => {
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    },[])
    
    const cardReducer = (venueList:Map<string,number>,action:{type:string; venueName:string; rating?:number })=>{
        switch(action.type){
            case 'add':{
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName,action.rating??0);
                return newVenueList;
            }
            case 'remove':{
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default:
                return venueList;
        }
    }
    
    let defaultVenue = new Map<string,number>([
        ["The Bloom Pavilion",0],
        ["Spark Space",0],
        ["The Grand Table",0],
    ]);

    const [venueList, dispatchVenue] = useReducer(cardReducer, defaultVenue);

    /**
     * Mock Data for Demonstration only
    //  */
    // const mockCardRepo = [
    //     {vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
    //     {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
    //     {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"},
    // ]

    if(!venueResponse){
        return <p>Venue Panel is Loading ... </p>
    }

    return(
        <div>
            <div style={{margin:"20px",display:"flex",
                  flexDirection:"row",flexWrap:"wrap",
                  justifyContent:"space-around", alignContent:"space-around", padding:"10px"}}>
                    {
                        venueResponse.data.map((venueItem:VenueItem)=> (
                            <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                                <Card venueName={venueItem.name} imgSrc={venueItem.picture} 
                                onRating={(venue: string, venueRating: number) => dispatchVenue({ type: 'add', venueName: venue, rating: venueRating })} />
                            </Link>
                        ))
                    }
            </div>
            
            <div className="w-full text-xl font-medium">Venue List with Rating :{venueList.size}</div>

                {Array.from(venueList).map(([venueName,rating])=> (
                    <div key={venueName} onClick={()=>dispatchVenue({type:'remove', venueName:venueName})} data-testid={`${venueName}`}>
                        {venueName} : {rating}
                    </div>))}

                    <button name="Count with Ref Object" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                    shadow-sm text-white" onClick={()=>{countRef.current=countRef.current+1; alert(countRef.current)}}>Count with Ref Object</button>

                    <input type="text" placeholder="Please fill" className="block text-grey-900 text-sm 
                    rounded-lg p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 focus:outline-none 
                    focus:bg-purple-200 focus:ring-2"
                    ref={inputRef}></input>

                    <button name="Focus Input" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                    shadow-sm text-white" onClick={()=>{if(inputRef.current!=null) inputRef.current.focus() }}>Focus Input</button>

        </div>
    )
}