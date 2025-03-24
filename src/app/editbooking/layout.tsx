import { ReactNode } from "react";
import BookingMenu from "@/components/BookingMenu";

export default function BookingLayout( {children}:{children:React.ReactNode} ){
    return (
        <div >
            <BookingMenu/>
            {children}
        </div>
    );
}