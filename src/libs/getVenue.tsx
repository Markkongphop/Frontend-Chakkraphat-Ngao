export default async function getVenue( id:string ) {
    const response = await fetch(`https://backend-eta-ashy.vercel.app/api/v1/coworkingspaces/${id}`)
    
    if(!response.ok){
        throw new Error("Failed to fetch venues")
    }

    return await response.json()
}
