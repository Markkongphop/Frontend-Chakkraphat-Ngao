export default async function getVenues(){

    await new Promise( (resolve)=>setTimeout(resolve, 300) )

    const response = await fetch("https://backend-eta-ashy.vercel.app/api/v1/coworkingspaces")
    if(!response.ok){
        throw new Error("Failed to fetch cars")
    }

    return await response.json()
}