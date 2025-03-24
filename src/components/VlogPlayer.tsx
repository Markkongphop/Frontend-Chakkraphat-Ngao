'use client'

import { useRef, useEffect, useState } from "react"
import useWindowLintener from "@/hooks/useWindowLintener"

export function VlogPlayer({vdoSrc, isPlaying} : {vdoSrc:string, isPlaying:boolean}){

    const vdoRef = useRef<HTMLVideoElement>(null)
    
    useEffect( ()=>{
        // alert('width is ' + vdoRef.current?.videoWidth)
        if(isPlaying){
            vdoRef.current?.play()
            // alert('play vdo')
        }else{
            vdoRef.current?.pause()
            // alert('pause vdo')  
        } 
    }, [isPlaying])

    useWindowLintener("resize",(e)=>{ alert('Window width is ' + (e.target as Window).innerWidth) })

    return (
        <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted/>
    )
}