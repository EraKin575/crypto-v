"use client"
import { useEffect,useState } from "react"

const BasicInfo = ({coin}) => {
   const {links}=coin
   console.log(links)


   const websites = links?.map((link, index) => {
    if (index < 4) {
      return (
        <div className="flex flex-col" key={index}>
          <p className="text-black font-semibold">{link.type.toUpperCase()}</p>
            <a href={link.url} target="_blank" rel="noreferrer">
                <p className="text-blue-500">{link.url}</p>
            </a>
        </div>
      );
    }
  });

    
     

  return (
    <div className="pl-[40px] border-r-solid border-r-[0.5px] border-gray-300 w-max pr-4 pt-[30px]">
        <h1 className="text-black font-semibold text-2xl">Basic Info</h1>
        <div className="flex gap-[10px] pt-[20px]">
        <p
        className="text-gray-500 bg-gray-300 rounded-lg w-min px-3 font-semibold"
        >#{coin.rank}</p>
        <p
        className="text-gray-500 bg-gray-300 rounded-lg w-min px-3 font-semibold"
        >Coin</p>
        </div>
    
    <div className='flex text-black flex-col gap-2'>
        <div className="flex flex-col">
            {websites}
           
            </div>

        </div>
        
   
    </div>
   
  )
}

export default BasicInfo