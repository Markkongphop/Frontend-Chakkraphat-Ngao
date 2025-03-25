

import Card from "./Card"
import Link from "next/link";
import { VenueJson,VenueItem } from "../../interface";


export default async function VenueCatalog({venuesJson}:{venuesJson:VenueJson}){

    const venueJsonReady = await venuesJson

    return (
        <>
            Explore {venueJsonReady.count} Coworkings
            <div
                style={{
                    margin: "115px",
                    display: "grid", // ใช้ grid layout แทน flex
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // ปรับขนาด card ให้เล็กลง
                    gap: "20px", // เพิ่ม gap ระหว่าง card
                    padding: "10px",
                }}
            >
                {venueJsonReady.data.map((venueItem: VenueItem) => (
                    <Link href={`/venue/${venueItem._id}`} key={venueItem._id} className="w-full">
                        <Card venueName={venueItem.name} imgSrc="/img/co.png" />
                    </Link>
                ))}
            </div>
        </>
    );
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