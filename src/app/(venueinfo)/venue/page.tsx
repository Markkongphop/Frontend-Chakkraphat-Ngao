// src/app/venue/page.tsx

import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { VenueJson } from "../../../../interface";

export default async function Venue() {
    try {
        const venues: VenueJson = await getVenues();

        return (
            <main className="text-center py-10">
                <h1 className="text-xl font-bold">COWORKINGSPACES</h1>
                <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                    <VenueCatalog venuesJson={venues} />
                </Suspense>
            </main>
        );
    } catch (error) {
        console.error("Error fetching venues:", error);
        return (
            <main className="text-center p-5">
                <h1 className="text-xl font-medium">Error loading venues</h1>
                <p>An error occurred while loading venues. Please try again later.</p>
            </main>
        );
    }
}