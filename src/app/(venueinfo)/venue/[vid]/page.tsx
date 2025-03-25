import Image from "next/image"
import getVenue from "@/libs/getVenue"
import Link from "next/link"

export default async function VenueDetailPage( {params} : {params:{vid:string}}){

    const venueDetail = await getVenue(params.vid)
    
    /**
     * Mock Data for Demonstration only
     */
    // const mockCardRepo = new Map()
    // mockCardRepo.set("001", {name:"The Bloom Pavilion", image:"/img/bloom.jpg"})
    // mockCardRepo.set("002", {name:"Spark Space", image:"/img/sparkspace.jpg"})
    // mockCardRepo.set("003", {name:"The Grand Table", image:"/img/grandtable.jpg"})

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src="/img/co.png"
                alt='Venue Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">Name: {venueDetail.data.name}
                    <div>Address: {venueDetail.data.address}</div>
                    <div>Tel: {venueDetail.data.tel}</div>
                    <div>OpenTime: {venueDetail.data.Open_time}</div>
                    <div>CloseTime: {venueDetail.data.Close_time}</div>
                </div>


            </div>
        </main>
    )

}

// export async function generateStaticParams() {
//     return [{vid:'001'},{vid:'002'},{vid:'003'}]
// }

