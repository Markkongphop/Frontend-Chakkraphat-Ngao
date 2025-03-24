

import Card from "./Card"
import Link from "next/link";
import { VenueJson,VenueItem } from "../../interface";


export default async function VenueCatalog({venuesJson}:{venuesJson:VenueJson}){

    const venueJsonReady = await venuesJson

    return(
        <>
        Explore {venueJsonReady.count} venues in our catalog
        <div style={{margin:"20px",display:"flex",
                          flexDirection:"row",flexWrap:"wrap",
                          justifyContent:"space-around", alignContent:"space-around", padding:"10px"}}>
                            {
                                venueJsonReady.data.map((venueItem:VenueItem)=> (
                                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                                        <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                                    </Link>
                                ))
                            }
        
        </div>
        </>
    )
}


// import Link from "next/link";
// import Card from "./Card";
// import { VenueItem,VenueJson } from "../../interface";

// export default async function VenueCatalog({venuesJson}:{venuesJson:VenueJson}){

//     const venueJsonReady = await venuesJson
    
//     return(
//         <>
//         Explore {venueJsonReady.count} venues in our catalog
//         <div style={{margin:"20px" ,display:"flex",
//         flexDirection:"row" ,alignContent:"space-around",
//         justifyContent:"space-around",flexWrap:"wrap",padding:"10px"}}>
//             {
//                 venueJsonReady.data.map((venueItem:VenueItem)=>(
//                     <Link href={`/venue/${venueItem.id}`}className="w-1/5">
//                         <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
//                     </Link>
//                 ))
//             }
//         </div>
//         </>
//     )
// }