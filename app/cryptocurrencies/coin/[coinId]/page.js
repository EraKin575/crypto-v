"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import CoinStats  from "@/components/coinComponents/CoinStats"
import BasicInfo from "@/components/coinComponents/BasicInfo"
import PriceChart from "@/components/coinComponents/PriceChart"
export default function Page({ params }) {
  const [coin,setCoin]=useState("")

  useEffect(()=>{
    const headers={
      'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
    async function getCoin(){
      await axios.get('https://coinranking1.p.rapidapi.com/coin/'+params.coinId,
      {headers:headers,
        params:{
          timePeriod:'7d'

        }
      }

      ).then((response)=>{
        setCoin(response.data.data.coin)
        console.log(response)
      }
      ).catch((error)=>{
        console.log(error)
      }
      )
      


  }
  getCoin()
},[])



  
  
  
  return(
  <div
  className='pb-[20px] py-[50px] h-max w-screen rounded-md shadow-lg text-black  bg-white'
  >
    {coin &&<CoinStats coin={coin}/>}
    <div className="flex">
    {coin && <BasicInfo coin={coin}/>}
    <PriceChart/>
    </div>

  </div>
  )
}